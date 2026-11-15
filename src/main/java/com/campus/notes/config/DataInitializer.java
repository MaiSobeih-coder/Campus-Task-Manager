package com.campus.notes.config;

import com.campus.notes.model.Note;
import com.campus.notes.repository.NoteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(NoteRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new Note("Math Assignment", "Solve chapters 1 to 4 before Sunday", "High"));
                repository.save(new Note("Spring Boot Project", "Submit the Docker assignment", "High"));
                repository.save(new Note("Buy Groceries", "Milk, Eggs, Bread", "Low"));
                System.out.println("✅ Sample data loaded successfully!");
            }
        };
    }
}
