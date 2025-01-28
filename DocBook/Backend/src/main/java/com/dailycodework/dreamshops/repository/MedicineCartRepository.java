package com.dailycodework.dreamshops.repository;

import com.dailycodework.dreamshops.model.CartItem_medicine;
import com.dailycodework.dreamshops.model.Cart_medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface MedicineCartRepository extends JpaRepository<Cart_medicine, Long> {


    // Find the max cart ID for a user
    @Query(value = "SELECT MAX(c.cart_id) FROM cart_medicine c WHERE c.user_id = :userId", nativeQuery = true)
    Long findMaxCartIdByUserId(Long userId);
}
