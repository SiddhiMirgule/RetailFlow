package com.siddhi.retailflow.service.imp;

import com.siddhi.retailflow.entity.CategoryEntity;
import com.siddhi.retailflow.io.CategoryRequest;
import com.siddhi.retailflow.io.CategoryResponse;
import com.siddhi.retailflow.repository.CategoryRepository;
import com.siddhi.retailflow.service.CategoryService;
import com.siddhi.retailflow.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {  // 👈 removed @RequiredArgsConstructor

    private final CategoryRepository categoryRepository;
    private final FileUploadService fileUploadService;

    @Autowired  // 👈 explicit constructor
    public CategoryServiceImpl(CategoryRepository categoryRepository,
                               FileUploadService fileUploadService) {
        this.categoryRepository = categoryRepository;
        this.fileUploadService = fileUploadService;
    }

    @Override
    public CategoryResponse add(CategoryRequest request, MultipartFile file) throws IOException {
        String imgUrl = fileUploadService.uploadFileService(file);
        CategoryEntity newCategory = convertToEntity(request);
        newCategory.setImgUrl(imgUrl);
        newCategory = categoryRepository.save(newCategory);
        return convertToResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String categoryId) {
        CategoryEntity existingCategory = categoryRepository
                .findByCategoryId(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found " + categoryId));

        boolean deleted = fileUploadService.deleteFileService(existingCategory.getImgUrl());

        if (!deleted) {
            throw new RuntimeException("Failed to delete image from storage");
        }

        categoryRepository.delete(existingCategory);
    }

    private CategoryResponse convertToResponse(CategoryEntity newCategory) {
        return CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .name(newCategory.getName())
                .description(newCategory.getDescription())
                .bgColor(newCategory.getBgColor())
                .imgUrl(newCategory.getImgUrl())
                .createdAt(newCategory.getCreatedAt())
                .updatedAt(newCategory.getUpdatedAt())
                .build();
    }

    private CategoryEntity convertToEntity(CategoryRequest request) {
        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .bgColor(request.getBgColor())
                .build();
    }
}