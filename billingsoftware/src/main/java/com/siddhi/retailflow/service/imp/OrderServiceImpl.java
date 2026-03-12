package com.siddhi.retailflow.service.imp;

import com.siddhi.retailflow.entity.PaymentMethod;
import com.siddhi.retailflow.entity.OrderEntity;
import com.siddhi.retailflow.entity.OrderItemEntity;
import com.siddhi.retailflow.io.OrderRequest;
import com.siddhi.retailflow.io.OrderResponse;
import com.siddhi.retailflow.io.PaymentDetails;
import com.siddhi.retailflow.io.PaymentVerificationRequest;
import com.siddhi.retailflow.repository.OrderEntityRepository;
import com.siddhi.retailflow.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.HexFormat;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderEntityRepository orderEntityRepository;

    @Override
    public OrderResponse createOrder(OrderRequest request) {
        OrderEntity newOrder = convertToOrderEntity(request);
        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setStatus(newOrder.getPaymentMethod() == PaymentMethod.CASH ?
                PaymentDetails.PaymentStatus.COMPLETED : PaymentDetails.PaymentStatus.PENDING);
        newOrder.setPaymentDetails(paymentDetails);
        List<OrderItemEntity> orderItems = request.getCartItems().stream()
                .map(this::convertToOrderItemEntity)
                .collect(Collectors.toList());
        newOrder.setItems(orderItems);
        newOrder = orderEntityRepository.save(newOrder);
        return convertToResponse(newOrder);
    }

    private OrderEntity convertToOrderEntity(OrderRequest request) {
        return OrderEntity.builder()
                .orderId(UUID.randomUUID().toString())
                .customerName(request.getCustomerName())
                .phoneNumber(request.getPhoneNumber())
                .subtotal(request.getSubtotal())
                .tax(request.getTax())
                .grandTotal(request.getGrandTotal())
                .paymentMethod(request.getPaymentMethod())
                .build();
    }

    private OrderItemEntity convertToOrderItemEntity(OrderRequest.OrderItemRequest orderItemRequest) {
        return OrderItemEntity.builder()
                .itemId(orderItemRequest.getItemId())
                .name(orderItemRequest.getName())
                .price(orderItemRequest.getPrice())
                .quantity(orderItemRequest.getQuantity())
                .build();
    }

    private OrderResponse convertToResponse(OrderEntity order) {
        return OrderResponse.builder()
                .orderId(order.getOrderId())
                .customerName(order.getCustomerName())
                .phoneNumber(order.getPhoneNumber())
                .subtotal(order.getSubtotal())
                .tax(order.getTax())
                .grandTotal(order.getGrandTotal())
                .paymentMethod(order.getPaymentMethod())
                .createdAt(order.getCreatedAt())
                .paymentDetails(order.getPaymentDetails())
                .build();
    }

    @Override
    public void deleteOrder(String orderId) {
        OrderEntity existingOrder = orderEntityRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
        orderEntityRepository.delete(existingOrder);
    }

    @Override
    public List<OrderResponse> getLatestOrders() {
        return orderEntityRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse verifyPayment(PaymentVerificationRequest request) {
        OrderEntity existingOrder = orderEntityRepository.findByOrderId(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found")); // ✅ Fixed: moved inside method

        if (!verifyRazorpaySignature(                                        // ✅ Fixed: syntax errors
                request.getRazorpayOrderId(),
                request.getRazorpayPaymentId(),                              // ✅ Fixed: semicolon -> comma
                request.getRazorpaySignature())) {
            throw new RuntimeException("Payment verification failed");       // ✅ Fixed: missing semicolon
        }

        PaymentDetails paymentDetails = existingOrder.getPaymentDetails();
        paymentDetails.setRazorpayOrderId(request.getRazorpayOrderId());     // ✅ Added from image
        paymentDetails.setRazorpayPaymentId(request.getRazorpayPaymentId()); // ✅ Added from image
        paymentDetails.setRazorpaySignature(request.getRazorpaySignature()); // ✅ Added from image
        paymentDetails.setStatus(PaymentDetails.PaymentStatus.COMPLETED);    // ✅ Added from image
        existingOrder.setPaymentDetails(paymentDetails);
        existingOrder = orderEntityRepository.save(existingOrder);
        return convertToResponse(existingOrder);
    }

    private boolean verifyRazorpaySignature(String razorpayOrderId,
                                            String razorpayPaymentId,
                                            String razorpaySignature) {
        try {
            String data = razorpayOrderId + "|" + razorpayPaymentId;
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(
                    System.getenv("RAZORPAY_KEY_SECRET").getBytes(), "HmacSHA256");
            mac.init(secretKey);
            byte[] hash = mac.doFinal(data.getBytes());
            String generatedSignature = HexFormat.of().formatHex(hash);
            return generatedSignature.equals(razorpaySignature);
        } catch (Exception e) {
            return false;
        }
    }
}