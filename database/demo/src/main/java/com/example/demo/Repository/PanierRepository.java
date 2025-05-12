package com.example.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Furniture;
import com.example.demo.entity.Panier;
import com.example.demo.entity.User;

@Repository
public interface PanierRepository extends JpaRepository<Panier, Long> {
    List<Panier> findByUser(User user);
    Optional<Panier> findByUserAndFurniture(User user, Furniture furniture);
} 