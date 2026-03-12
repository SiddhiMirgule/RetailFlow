package com.siddhi.retailflow.controller;

import com.siddhi.retailflow.io.OrderResponse;
import com.siddhi.retailflow.io.PaymentRequest;
import com.siddhi.retailflow.io.PaymentVerificationRequest;
import com.siddhi.retailflow.io.RazorpayOrderResponse;
import com.siddhi.retailflow.service.OrderService;
import com.siddhi.retailflow.service.RazorpayService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
public class PaymentController {
    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException{
       return razorpayService.createorder(request.getAmount(),request.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request){
        return OrderService.verifyPayment(request);

    }
}
