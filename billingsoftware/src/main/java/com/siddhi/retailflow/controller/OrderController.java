package com.siddhi.retailflow.controller;

import com.siddhi.retailflow.io.OrderRequest;
import com.siddhi.retailflow.io.OrderResponse;
import com.siddhi.retailflow.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService; //  Fixed: } -> ;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrder(@RequestBody OrderRequest request) { // ✅ Added OrderRequest import
        return orderService.createOrder(request);
    }

    @DeleteMapping("/{orderId}") //  Fixed: @DeleetMapping -> @DeleteMapping, removed extra {
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(@PathVariable String orderId) { // Fixed: @PathVaribale -> @PathVariable
        orderService.deleteOrder(orderId);
    }

    @GetMapping("/latest") //  Added missing getLatestOrders endpoint
    public List<OrderResponse> getLatestOrders() {
        return orderService.getLatestOrders();
    }
}