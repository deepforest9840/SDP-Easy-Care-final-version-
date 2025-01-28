package com.dailycodework.dreamshops.controller;

import com.dailycodework.dreamshops.dto.MedicineCartItemDto;
import com.dailycodework.dreamshops.model.CartItem_medicine;
import com.dailycodework.dreamshops.response.ApiResponse;
import com.dailycodework.dreamshops.service.medicine_cart.MedicineICartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/medicine_cartItems")
public class MedicineCartItemController {

    private final MedicineICartItemService cartItemService;

    // Add an item to the cart
    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addItemToCart(@RequestBody MedicineCartItemDto cartItemDto) {
        cartItemService.addItemToCart(cartItemDto);
        return ResponseEntity.ok(new ApiResponse("Item successfully added to cart", null));
    }

    // Fetch all items in a cart by user_id and cart_id
    @GetMapping("/{user_id}/{cart_id}")
    public ResponseEntity<List<CartItem_medicine>> getItemsByUserAndCart(
            @PathVariable Long user_id, @PathVariable Long cart_id) {
        List<CartItem_medicine> cartItems = cartItemService.getItemsByUserAndCart(user_id, cart_id);
        return ResponseEntity.ok(cartItems);
    }







    @GetMapping("/total-price/{user_id}/{cart_id}")
    public ResponseEntity<BigDecimal> getTotalPrice(
            @PathVariable Long user_id, @PathVariable Long cart_id) {
        BigDecimal totalPrice = cartItemService.getTotalPriceByUserAndCart(user_id, cart_id);
        return ResponseEntity.ok(totalPrice);
    }

    // Get the next cart ID for a user
    @GetMapping("/next-cart-id/{user_id}")
    public ResponseEntity<Long> getNextCartId(@PathVariable Long user_id) {
        Long nextCartId = cartItemService.getNextCartId(user_id);
        return ResponseEntity.ok(nextCartId);
    }





}
