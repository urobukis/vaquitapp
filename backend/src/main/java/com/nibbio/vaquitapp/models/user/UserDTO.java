package com.nibbio.vaquitapp.models.user;

public record UserDTO(
        Long id,
        String name,
        String email,
        String image
) {
}
