package com.nibbio.vaquitapp.models.spending;

import java.math.BigDecimal;

public record SpendingDTO(
        String description,
        BigDecimal amount
) {
}
