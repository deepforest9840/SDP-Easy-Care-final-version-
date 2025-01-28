package com.dailycodework.dreamshops.service.medicine_cart;

import com.dailycodework.dreamshops.dto.MedicineCartDto;
import com.dailycodework.dreamshops.dto.MedicineCartItemDto;
import com.dailycodework.dreamshops.exceptions.ResourceNotFoundException;
import com.dailycodework.dreamshops.model.CartItem_medicine;
import com.dailycodework.dreamshops.model.Cart_medicine;
import com.dailycodework.dreamshops.repository.MedicineCartItemRepository;

import com.dailycodework.dreamshops.repository.MedicineCartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicineCartService implements MedicineICartService {
    private final MedicineCartRepository cartRepository;

    // Add an item to the cart
    @Override
    public void addItemToCart(MedicineCartDto cartDto) {
        Cart_medicine cartItem = new Cart_medicine();

        cartItem.setUserId(cartDto.getUserId());
        cartItem.setCartId(cartDto.getCartId());


        // Save to the database
        cartRepository.save(cartItem);
    }





    // Get the next cart ID for a user
    public Long getNextCartId(Long user_id) {
        Long maxCartId = cartRepository.findMaxCartIdByUserId(user_id);
        return (maxCartId == null ? 1 : maxCartId + 1);
    }
}
