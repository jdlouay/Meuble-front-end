package com.example.demo.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Furniture;

public interface FurnitureRepository extends JpaRepository<Furniture, Long> {
}