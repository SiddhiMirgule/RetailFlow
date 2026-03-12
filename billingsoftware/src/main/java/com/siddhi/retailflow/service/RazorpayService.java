package com.siddhi.retailflow.service;

import com.razorpay.RazorpayException;
import com.siddhi.retailflow.io.RazorpayOrderResponse;

public interface RazorpayService {
    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException; // ✅ Fixed: createorder -> createOrder
}