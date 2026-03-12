package com.siddhi.retailflow.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.siddhi.retailflow.entity.PaymentMethod;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequest {

    private PaymentMethod paymentMethod;
    private String customerName;
    private String phoneNumber;
    private List<OrderItemRequest> cartItems;
    private Double subtotal ;
    private Double tax;
    private Double grandTotal;


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
        public static class OrderItemRequest{
        private String itemId;
        private String name ;
        private Double price;
        private Integer quantity ;

        }

    }


