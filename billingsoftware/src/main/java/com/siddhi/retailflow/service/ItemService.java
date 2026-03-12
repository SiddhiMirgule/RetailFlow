package com.siddhi.retailflow.service;

import com.siddhi.retailflow.io.ItemRequest;
import com.siddhi.retailflow.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ItemService {
    ItemResponse add(ItemRequest request, MultipartFile file) throws IOException;
    List<ItemResponse> fetchItems();
    void deleteItem(String itemId);
}