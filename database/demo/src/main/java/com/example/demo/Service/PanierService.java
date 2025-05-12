package com.example.demo.Service;

import com.example.demo.Repository.FurnitureRepository;
import com.example.demo.Repository.PanierRepository;
import com.example.demo.entity.Furniture;
import com.example.demo.entity.Panier;
import com.example.demo.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PanierService {

    @Autowired
    private PanierRepository panierRepository;

    @Autowired
    private FurnitureRepository furnitureRepository;

    public Panier addToCart(User user, Long furnitureId, int quantity) {
        Furniture furniture = furnitureRepository.findById(furnitureId).orElseThrow(() -> new RuntimeException("Furniture not found"));
        Panier panier = panierRepository.findByUserAndFurniture(user, furniture).orElse(new Panier());
        panier.setUser(user);
        panier.setFurniture(furniture);
        panier.setQuantity(quantity);
        panier.setTotal(furniture.getPrice() * quantity);
        return panierRepository.save(panier);
    }

    public Panier updateQuantity(User user, Long furnitureId, int quantity) {
        Furniture furniture = furnitureRepository.findById(furnitureId).orElseThrow(() -> new RuntimeException("Furniture not found"));
        Panier panier = panierRepository.findByUserAndFurniture(user, furniture).orElseThrow(() -> new RuntimeException("Cart item not found"));
        panier.setQuantity(quantity);
        panier.setTotal(furniture.getPrice() * quantity);
        return panierRepository.save(panier);
    }

    public void removeFromCart(User user, Long furnitureId) {
        Furniture furniture = furnitureRepository.findById(furnitureId).orElseThrow(() -> new RuntimeException("Furniture not found"));
        Panier panier = panierRepository.findByUserAndFurniture(user, furniture).orElseThrow(() -> new RuntimeException("Cart item not found"));
        panierRepository.delete(panier);
    }

    public List<Panier> getCart(User user) {
        return panierRepository.findByUser(user);
    }

} 