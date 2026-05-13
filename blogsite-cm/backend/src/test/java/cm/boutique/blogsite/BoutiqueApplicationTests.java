package cm.boutique.blogsite;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@ActiveProfiles("test")
@TestPropertySource(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb;MODE=MySQL;DATABASE_TO_LOWER=TRUE",
    "spring.datasource.driver-class-name=org.h2.Driver",
    "spring.datasource.username=sa",
    "spring.datasource.password=",
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "spring.flyway.enabled=false",
    "app.jwt.secret=test-secret-au-moins-64-caracteres-pour-passer-validation-hmac-sha512-XXX",
    "app.cors.allowed-origins=http://localhost:4200"
})
class BoutiqueApplicationTests {

    @Test
    void contextLoads() {
    }
}
