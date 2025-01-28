package com.dailycodework.dreamshops.service.cart;

import com.dailycodework.dreamshops.model.CartItem;

public interface ICartItemService {
    void addItemToCart(Long cartId, Long doctorId, int quantity);
    void removeItemFromCart(Long cartId, Long doctorId);
    void updateItemQuantity(Long cartId, Long doctorId, int quantity);

    CartItem getCartItem(Long cartId, Long doctorId);
}
