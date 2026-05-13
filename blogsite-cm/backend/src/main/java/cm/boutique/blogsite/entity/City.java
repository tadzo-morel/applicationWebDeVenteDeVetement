package cm.boutique.blogsite.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "cities", indexes = {
    @Index(name = "idx_cities_name", columnList = "name"),
    @Index(name = "idx_cities_region", columnList = "region_id")
})
public class City extends BaseEntity {

    @Column(nullable = false, length = 80)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;

    @Column(precision = 10, scale = 7)
    private BigDecimal latitude;

    @Column(precision = 10, scale = 7)
    private BigDecimal longitude;

    @Column(name = "is_main_hub", nullable = false)
    private Boolean isMainHub = Boolean.FALSE;

    public City() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Region getRegion() { return region; }
    public void setRegion(Region region) { this.region = region; }

    public BigDecimal getLatitude() { return latitude; }
    public void setLatitude(BigDecimal latitude) { this.latitude = latitude; }

    public BigDecimal getLongitude() { return longitude; }
    public void setLongitude(BigDecimal longitude) { this.longitude = longitude; }

    public Boolean getIsMainHub() { return isMainHub; }
    public void setIsMainHub(Boolean isMainHub) { this.isMainHub = isMainHub; }
}
