package com.nibbio.vaquitapp.models.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(@NotBlank @Email String email);

    List<User> findByNameContainingIgnoreCase(String name);
}
