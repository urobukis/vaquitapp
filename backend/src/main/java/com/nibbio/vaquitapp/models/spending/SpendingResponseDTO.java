package com.nibbio.vaquitapp.models.spending;

import com.nibbio.vaquitapp.models.user.UserDTO;

import java.math.BigDecimal;

public record SpendingResponseDTO(
        String description,
        UserDTO userId,
        BigDecimal amount
) {
}
