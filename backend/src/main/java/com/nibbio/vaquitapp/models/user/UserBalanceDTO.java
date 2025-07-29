package com.nibbio.vaquitapp.models.user;

import java.math.BigDecimal;

public record UserBalanceDTO(
        String name,
        BigDecimal totalAmount,
        BigDecimal balance
) {
}
