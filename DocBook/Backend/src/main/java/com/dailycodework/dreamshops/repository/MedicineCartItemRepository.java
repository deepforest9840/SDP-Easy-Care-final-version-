package com.dailycodework.dreamshops.repository;

import com.dailycodework.dreamshops.model.CartItem_medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface MedicineCartItemRepository extends JpaRepository<CartItem_medicine, Long> {

    // Find all cart items by user_id and cart_id
    List<CartItem_medicine> findByUserIdAndCartId(Long userId, Long cartId);

    // Calculate total price for a user and cart
    @Query(value = "SELECT SUM(c.total_price) FROM cart_item_medicine c WHERE c.user_id = :userId AND c.cart_id = :cartId", nativeQuery = true)
    BigDecimal calculateTotalPriceByUserIdAndCartId(Long userId, Long cartId);

    // Find the max cart ID for a user
    @Query(value = "SELECT MAX(c.cart_id) FROM cart_item_medicine c WHERE c.user_id = :userId", nativeQuery = true)
    Long findMaxCartIdByUserId(Long userId);
}
