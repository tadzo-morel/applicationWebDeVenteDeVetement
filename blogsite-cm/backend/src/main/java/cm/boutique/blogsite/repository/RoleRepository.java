package cm.boutique.blogsite.repository;

import cm.boutique.blogsite.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(Role.RoleName name);
}
