package com.siddhi.retailflow.service.imp;

import com.siddhi.retailflow.entity.CategoryEntity;
import com.siddhi.retailflow.entity.ItemEntity;
import com.siddhi.retailflow.io.ItemRequest;
import com.siddhi.retailflow.io.ItemResponse;
import com.siddhi.retailflow.repository.CategoryRepository;
import com.siddhi.retailflow.repository.ItemRepository;
import com.siddhi.retailflow.service.FileUploadService;
import com.siddhi.retailflow.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final FileUploadService fileUploadService;
    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;
    // ✅ Removed: private BigDecimal price — should not be here

    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) throws IOException { // ✅ Removed throws IOException
        String imgUrl = fileUploadService.uploadFile(file);
        ItemEntity newItem = convertToEntity(request);
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found " + request.getCategoryId()));
        newItem.setCategory(existingCategory);
        newItem.setImgUrl(imgUrl);
        newItem = itemRepository.save(newItem);
        return convertToResponse(newItem);
    }

    private ItemResponse convertToResponse(ItemEntity item) {
        return ItemResponse.builder()
                .itemId(item.getItemId())
                .name(item.getName())
                .price(item.getPrice())
                .description(item.getDescription())
                .imgUrl(item.getImgUrl())
                .categoryId(item.getCategory().getCategoryId())
                .build();
    }

    private ItemEntity convertToEntity(ItemRequest request) {
        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .price(request.getPrice())
                .description(request.getDescription())
                .build();
    }

    @Override
    public List<ItemResponse> fetchItems() {
        return itemRepository.findAll()
                .stream()
                .map(itemEntity -> convertToResponse(itemEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteItem(String itemId) {
        ItemEntity existingItem = itemRepository.findByItemId(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found: " + itemId));
        boolean isFileDelete = fileUploadService.deleteFileService(existingItem.getImgUrl());
        if (isFileDelete) {
            itemRepository.delete(existingItem);
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to delete item");
        }
    }
}