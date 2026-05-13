package cm.boutique.blogsite.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "regions")
public class Region extends BaseEntity {

    @Column(nullable = false, length = 50, unique = true)
    private String name;

    @Column(name = "name_en", length = 50)
    private String nameEn;

    @Column(length = 10, unique = true)
    private String code;

    public Region() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNameEn() { return nameEn; }
    public void setNameEn(String nameEn) { this.nameEn = nameEn; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
}
