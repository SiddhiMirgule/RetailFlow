package com.siddhi.retailflow.service;

import com.siddhi.retailflow.io.OrderRequest;
import com.siddhi.retailflow.io.OrderResponse;

import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrders();
}