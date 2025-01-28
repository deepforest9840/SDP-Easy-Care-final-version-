package com.dailycodework.dreamshops.service.medicine_cart;

import com.dailycodework.dreamshops.dto.MedicineCartDto;
import com.dailycodework.dreamshops.dto.MedicineCartItemDto;
import com.dailycodework.dreamshops.model.CartItem_medicine;

import java.math.BigDecimal;
import java.util.List;

public interface MedicineICartService {
    void addItemToCart(MedicineCartDto cartDto);

    // Get all cart items for a specific user and cart

    // Fetch the next cart ID for a user
    Long getNextCartId(Long user_id);
}
