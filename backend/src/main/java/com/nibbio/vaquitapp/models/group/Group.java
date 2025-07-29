package com.nibbio.vaquitapp.models.group;

import com.nibbio.vaquitapp.models.spending.Spending;
import com.nibbio.vaquitapp.models.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user_groups")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToMany
    @JoinTable(
            name = "group_members",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> members = new ArrayList<>();
    private String title;
    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    private List<Spending> spending = new ArrayList<>();

    @Override
    public String toString() {
        return "Group{" +
                "title='" + title + '\'' +
                '}';
    }
}
