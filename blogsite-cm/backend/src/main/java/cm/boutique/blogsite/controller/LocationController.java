package cm.boutique.blogsite.controller;

import cm.boutique.blogsite.entity.City;
import cm.boutique.blogsite.entity.Region;
import cm.boutique.blogsite.repository.CityRepository;
import cm.boutique.blogsite.repository.RegionRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Localisation", description = "Regions et villes du Cameroun")
public class LocationController {

    private final RegionRepository regionRepository;
    private final CityRepository cityRepository;

    public LocationController(RegionRepository regionRepository, CityRepository cityRepository) {
        this.regionRepository = regionRepository;
        this.cityRepository = cityRepository;
    }

    @Operation(summary = "Liste des 10 regions du Cameroun")
    @GetMapping("/regions")
    public ResponseEntity<List<Region>> getRegions() {
        return ResponseEntity.ok(regionRepository.findAll());
    }

    @Operation(summary = "Villes (filtrables par regionId)")
    @GetMapping("/cities")
    public ResponseEntity<List<City>> getCities(@RequestParam(required = false) Long regionId) {
        if (regionId != null) {
            return ResponseEntity.ok(cityRepository.findByRegionId(regionId));
        }
        return ResponseEntity.ok(cityRepository.findAll());
    }

    @Operation(summary = "Hubs principaux (Douala, Yaounde)")
    @GetMapping("/cities/main-hubs")
    public ResponseEntity<List<City>> getMainHubs() {
        return ResponseEntity.ok(cityRepository.findByIsMainHubTrue());
    }
}
