package com.nibbio.vaquitapp.services;

import com.nibbio.vaquitapp.models.group.Group;
import com.nibbio.vaquitapp.models.group.GroupDTO;
import com.nibbio.vaquitapp.models.group.GroupResponseDTO;
import com.nibbio.vaquitapp.models.spending.BalanceDTO;
import com.nibbio.vaquitapp.models.spending.Spending;
import com.nibbio.vaquitapp.models.spending.SpendingDTO;
import com.nibbio.vaquitapp.models.spending.SpendingResponseDTO;
import com.nibbio.vaquitapp.models.user.User;
import com.nibbio.vaquitapp.models.user.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DataTransformer {


    public GroupResponseDTO transformGroupResponse(Group newGroup) {

        var members = newGroup.getMembers().stream().map(this::transformUser).toList();
        var spending = newGroup.getSpending().stream().map(this::transformSpending).toList();

        return new GroupResponseDTO(
                newGroup.getTitle(),
                members,
                spending
        );
    }

    public SpendingDTO transformSpending(Spending spending) {

        return new SpendingDTO(
                spending.getDescription(),
                spending.getAmount()
        );
    }

    public SpendingResponseDTO transformSpendingResponseDTO(Spending spending){
        var user = transformUser(spending.getUser());
        return new SpendingResponseDTO(
                spending.getDescription(),
                user,
                spending.getAmount()
        );
    }

    public UserDTO transformUser(User members) {
        if(members == null){
            return null;
        }
        return new UserDTO(
                members.getId(),
                members.getName(),
                members.getEmail(),
                members.getImage()
        );
    }
//    public List<UserDTO> transformUser(List<User> members) {
//        if(members == null){
//            return null;
//        }
//        return members.stream().map(m-> new UserDTO(
//                m.getId(),
//                m.getName(),
//                m.getEmail(),
//                m.getImage()
//        )).toList();
//    }

    public GroupDTO transformGroup(Group group) {
        var members = group.getMembers().stream().map(this::transformUser).toList();
        var spending = group.getSpending().stream().map(this::transformSpendingResponseDTO).toList();
        return new GroupDTO(
                group.getId(),
                group.getTitle(),
                members,
                spending
        );
    }


    public BalanceDTO transformBalances(BigDecimal subtract, String name, BigDecimal totalAmount) {
        return new BalanceDTO(
                name,
                totalAmount,
                subtract
        );
    }
}
