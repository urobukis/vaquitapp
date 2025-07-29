package com.nibbio.vaquitapp.models.spending;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpendingRepository extends JpaRepository<Spending, Long> {
    List<Spending> findByUserIdAndGroupId(Long userId, Long groupId);
}
