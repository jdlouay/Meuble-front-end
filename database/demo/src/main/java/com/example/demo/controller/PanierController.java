package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Service.PanierService;
import com.example.demo.entity.Panier;
import com.example.demo.entity.User;

@RestController
@RequestMapping("api/cart")
public class PanierController {

    @Autowired
    private PanierService panierService;

    public PanierController() {
        System.out.println("PanierController loaded !");
    }

    @PostMapping("/add")
    public ResponseEntity<Panier> addToCart(@RequestParam("userId") Long userId, @RequestParam("furnitureId") Long furnitureId, @RequestParam("quantity") int quantity) {
        // Dans un cas réel, on récupérerait l'utilisateur (par exemple via un service d'authentification) ; ici, on simule avec un objet User.
        User user = new User();
        user.setId(userId);
        Panier panier = panierService.addToCart(user, furnitureId, quantity);
        return ResponseEntity.ok(panier);
    }

    @PutMapping("/update")
    public ResponseEntity<Panier> updateQuantity(@RequestParam("userId") Long userId, @RequestParam("furnitureId") Long furnitureId, @RequestParam("quantity") int quantity) {
        User user = new User();
        user.setId(userId);
        Panier panier = panierService.updateQuantity(user, furnitureId, quantity);
        return ResponseEntity.ok(panier);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeFromCart(@RequestParam("userId") Long userId, @RequestParam("furnitureId") Long furnitureId) {
        User user = new User();
        user.setId(userId);
        panierService.removeFromCart(user, furnitureId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Panier>> getCart(@RequestParam("userId") Long userId) {
        User user = new User();
        user.setId(userId);
        List<Panier> cart = panierService.getCart(user);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/checkout")
    public ResponseEntity<String> checkout(@RequestParam("userId") Long userId, @RequestParam("paymentMode") String paymentMode) {
        // Dans un cas réel, on récupérerait l'utilisateur (par exemple via un service d'authentification) et on traiterait la finalisation de la commande (par exemple, en créant une entité Commande, en vidant le panier, etc.).
        // Ici, on renvoie un message de succès.
        String message = "Commande finalisée avec le mode de paiement : " + paymentMode + " pour l'utilisateur " + userId;
        return ResponseEntity.ok(message);
    }

} 