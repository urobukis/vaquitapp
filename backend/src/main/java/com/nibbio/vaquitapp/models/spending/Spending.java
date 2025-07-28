package com.nibbio.vaquitapp.models.spending;

import com.nibbio.vaquitapp.models.group.Group;
import com.nibbio.vaquitapp.models.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "spendings")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Spending {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User user;
    private String description;
    private LocalDateTime date;
    @Column(precision = 10, scale = 2)
    private BigDecimal amount;
    @ManyToOne
    private Group group;
}
