package com.dailycodework.dreamshops.controller;

import com.dailycodework.dreamshops.dto.MedicineCartDto;
import com.dailycodework.dreamshops.dto.MedicineCartItemDto;
import com.dailycodework.dreamshops.model.CartItem_medicine;
import com.dailycodework.dreamshops.response.ApiResponse;
import com.dailycodework.dreamshops.service.medicine_cart.MedicineICartItemService;
import com.dailycodework.dreamshops.service.medicine_cart.MedicineICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/medicine_cart")
public class MedicineCartController {

    private final MedicineICartService cartService;

    // Add an item to the cart
    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addItemToCart(@RequestBody MedicineCartDto cartDto) {
        cartService.addItemToCart(cartDto);
        return ResponseEntity.ok(new ApiResponse("Item successfully added to cart", null));
    }









    // Get the next cart ID for a user
    @GetMapping("/next-cart-id/{user_id}")
    public ResponseEntity<Long> getNextCartId(@PathVariable Long user_id) {
        Long nextCartId = cartService.getNextCartId(user_id);
        return ResponseEntity.ok(nextCartId);
    }





}
