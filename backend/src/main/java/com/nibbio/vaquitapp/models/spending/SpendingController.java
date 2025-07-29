package com.nibbio.vaquitapp.models.spending;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Transactional
@RequestMapping("/spending")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearer-key")
public class SpendingController {

    private final SpendingService spendingService;

    @GetMapping("/{groupId}/balances")
    public ResponseEntity<List<BalanceDTO>> getBalance(@PathVariable Long groupId){
        var balance = spendingService.getBalance(groupId);
        return ResponseEntity.ok().body(balance);
    }
}
