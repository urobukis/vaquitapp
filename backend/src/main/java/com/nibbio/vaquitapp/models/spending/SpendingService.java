package com.nibbio.vaquitapp.models.spending;


import com.nibbio.vaquitapp.models.group.GroupRepository;
import com.nibbio.vaquitapp.services.DataTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SpendingService {

    private final GroupRepository groupRepository;
    private final SpendingRepository spendingRepository;
    private final DataTransformer dataTransformer;

    public List<BalanceDTO> getBalance(Long groupId) {
        var group = groupRepository.findById(groupId).orElseThrow(() -> new RuntimeException("Grupo no encontrado"));


        BigDecimal totalSpendings = group.getSpending()
                .stream()
                .map(Spending::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .divide(BigDecimal.valueOf(group.getMembers().size()), 2, RoundingMode.HALF_UP);


        Map<Long, BigDecimal> userTotalMap = group.getSpending().stream()
                .collect(Collectors.groupingBy(
                        s -> s.getUser().getId(),
                        Collectors.reducing(BigDecimal.ZERO, Spending::getAmount, BigDecimal::add)
                ));


        return group.getMembers().stream()
                .map(user -> {
                    Long userId = user.getId();
                    String userName = user.getName();
                    BigDecimal userAmount = userTotalMap.getOrDefault(userId, BigDecimal.ZERO);

                    return dataTransformer.transformBalances(
                            totalSpendings.subtract(userAmount),
                            userName,
                            userAmount
                    );
                })
                .toList();

    }
}
