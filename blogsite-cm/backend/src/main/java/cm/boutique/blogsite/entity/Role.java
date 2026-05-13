package cm.boutique.blogsite.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role extends BaseEntity {

    public enum RoleName {
        ROLE_USER,
        ROLE_ADMIN
    }

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true, length = 30)
    private RoleName name;

    @Column(length = 200)
    private String description;

    public Role() {}

    public Role(RoleName name, String description) {
        this.name = name;
        this.description = description;
    }

    public RoleName getName() { return name; }
    public void setName(RoleName name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
