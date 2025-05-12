package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Service.FurnitureService;
import com.example.demo.entity.Furniture;

import java.util.List;

@RestController
@RequestMapping("/api/furniture")

public class FurnitureController {

    @Autowired
    private FurnitureService furnitureService;

    @GetMapping
    public List<Furniture> getAllFurniture() {
        return furnitureService.getAllFurniture();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Furniture> getFurnitureById(@PathVariable Long id) {
        return furnitureService.getFurnitureById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Furniture createFurniture(@RequestBody Furniture furniture) {
        return furnitureService.saveFurniture(furniture);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Furniture> updateFurniture(@PathVariable Long id, @RequestBody Furniture updatedFurniture) {
        return furnitureService.getFurnitureById(id)
                .map(existing -> {
                    existing.setName(updatedFurniture.getName());
                    existing.setDescription(updatedFurniture.getDescription());
                    existing.setPrice(updatedFurniture.getPrice());
                    existing.setImageUrl(updatedFurniture.getImageUrl());
                    existing.setCategory(updatedFurniture.getCategory()); // ✅ Add this line
                    return ResponseEntity.ok(furnitureService.saveFurniture(existing));
                }).orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFurniture(@PathVariable Long id) {
        furnitureService.deleteFurniture(id);
        return ResponseEntity.noContent().build();
    }
}