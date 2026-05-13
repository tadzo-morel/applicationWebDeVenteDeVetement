package cm.boutique.blogsite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BoutiqueApplication {

    public static void main(String[] args) {
        SpringApplication.run(BoutiqueApplication.class, args);
    }
}
