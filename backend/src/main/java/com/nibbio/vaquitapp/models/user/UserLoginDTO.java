package com.nibbio.vaquitapp.models.user;

import jakarta.validation.constraints.NotBlank;

public record UserLoginDTO(
        @NotBlank
        String email,
        @NotBlank
        String password
) {
}
