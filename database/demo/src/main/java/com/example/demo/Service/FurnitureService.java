package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.FurnitureRepository;
import com.example.demo.entity.Furniture;

import java.util.List;
import java.util.Optional;

@Service
public class FurnitureService {

    @Autowired
    private FurnitureRepository furnitureRepository;

    public List<Furniture> getAllFurniture() {
        return furnitureRepository.findAll();
    }

    public Optional<Furniture> getFurnitureById(Long id) {
        return furnitureRepository.findById(id);
    }

    public Furniture saveFurniture(Furniture furniture) {
        return furnitureRepository.save(furniture);
    }

    public void deleteFurniture(Long id) {
        furnitureRepository.deleteById(id);
    }
}
