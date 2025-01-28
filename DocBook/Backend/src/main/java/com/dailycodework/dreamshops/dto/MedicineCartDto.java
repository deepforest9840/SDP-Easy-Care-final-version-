package com.dailycodework.dreamshops.dto;

import java.math.BigDecimal;

public class MedicineCartDto {

    private Long id;
    private Long userId;  // Renamed to camelCase
    private Long cartId;  // Renamed to camelCase

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }
}
