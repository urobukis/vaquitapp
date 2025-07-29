package com.nibbio.vaquitapp.models.spending;

import java.math.BigDecimal;

public record BalanceDTO(
        String name,
        BigDecimal totalExpenses,
        BigDecimal balance
) {
}
