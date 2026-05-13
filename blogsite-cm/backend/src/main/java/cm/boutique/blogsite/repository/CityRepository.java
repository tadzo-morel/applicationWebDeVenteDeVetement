package cm.boutique.blogsite.repository;

import cm.boutique.blogsite.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CityRepository extends JpaRepository<City, Long> {

    List<City> findByRegionId(Long regionId);

    List<City> findByIsMainHubTrue();
}
