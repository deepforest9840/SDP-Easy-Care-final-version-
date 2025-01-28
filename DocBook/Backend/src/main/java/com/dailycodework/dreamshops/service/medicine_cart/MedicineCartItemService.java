package com.dailycodework.dreamshops.service.medicine_cart;

import com.dailycodework.dreamshops.dto.MedicineCartItemDto;
import com.dailycodework.dreamshops.exceptions.ResourceNotFoundException;
import com.dailycodework.dreamshops.model.CartItem_medicine;
import com.dailycodework.dreamshops.repository.MedicineCartItemRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicineCartItemService implements MedicineICartItemService {
    private final MedicineCartItemRepository cartItemRepository;

    // Add an item to the cart
    @Override
    public void addItemToCart(MedicineCartItemDto cartItemDto) {
        CartItem_medicine cartItem = new CartItem_medicine();

        cartItem.setUserId(cartItemDto.getUserId());
        cartItem.setCartId(cartItemDto.getCartId());
        cartItem.setProductId(cartItemDto.getProductId());
        cartItem.setQuantity(cartItemDto.getQuantity());
        cartItem.setUnitPrice(cartItemDto.getUnitPrice());

        // Calculate total price
        cartItem.setTotalPrice();

        // Save to the database
        cartItemRepository.save(cartItem);
    }

    // Fetch cart items by user_id and cart_id
    @Override
    public List<CartItem_medicine> getItemsByUserAndCart(Long user_id, Long cart_id) {
        List<CartItem_medicine> cartItems = cartItemRepository.findByUserIdAndCartId(user_id, cart_id);
        if (cartItems.isEmpty()) {
            throw new ResourceNotFoundException("No items found for the given user and cart");
        }
        return cartItems;
    }

    // Get total price for a user and cart
    public BigDecimal getTotalPriceByUserAndCart(Long user_id, Long cart_id) {
        BigDecimal totalPrice = cartItemRepository.calculateTotalPriceByUserIdAndCartId(user_id, cart_id);
        if (totalPrice == null) {
            throw new ResourceNotFoundException("No items found for the given user and cart");
        }
        return totalPrice;
    }

    // Get the next cart ID for a user
    public Long getNextCartId(Long user_id) {
        Long maxCartId = cartItemRepository.findMaxCartIdByUserId(user_id);
        return (maxCartId == null ? 1 : maxCartId + 1);
    }
}
