package com.dailycodework.dreamshops.service.medicine_cart;

import com.dailycodework.dreamshops.dto.MedicineCartItemDto;
import com.dailycodework.dreamshops.model.CartItem_medicine;

import java.math.BigDecimal;
import java.util.List;

public interface MedicineICartItemService {
    void addItemToCart(MedicineCartItemDto cartItemDto);

    // Get all cart items for a specific user and cart
    List<CartItem_medicine> getItemsByUserAndCart(Long user_id, Long cart_id);

    // Calculate the total price for a user and a cart
    BigDecimal getTotalPriceByUserAndCart(Long user_id, Long cart_id);

    // Fetch the next cart ID for a user
    Long getNextCartId(Long user_id);
}
