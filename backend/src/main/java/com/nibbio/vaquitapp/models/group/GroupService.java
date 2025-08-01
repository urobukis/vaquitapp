package com.nibbio.vaquitapp.models.group;

import com.nibbio.vaquitapp.models.spending.Spending;
import com.nibbio.vaquitapp.models.spending.SpendingDTO;
import com.nibbio.vaquitapp.models.user.AnonymusUserDTO;
import com.nibbio.vaquitapp.models.user.User;
import com.nibbio.vaquitapp.models.user.UserRepository;
import com.nibbio.vaquitapp.services.DataTransformer;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class GroupService {

    private final GroupRepository groupRepository;
    private final DataTransformer dataTransformer;
    private final UserRepository userRepository;

    public GroupResponseDTO createGroup(GroupRequestDTO group, Long id) {
        var myUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Grupo no encontrado"));
        List<User> members = new ArrayList<>();
        List<Spending> spendings = new ArrayList<>();
        members.add(myUser);
        var newGroup = new Group(
                null,
                members,
                group.title(),
                spendings
        );
        myUser.getUserGroups().add(newGroup);
        var saveGroup = groupRepository.save(newGroup);
        return dataTransformer.transformGroupResponse(saveGroup);
    }

    public List<GroupDTO> getGroups(Long id) {
        var findGroups = groupRepository.findByMembers_id(id);

        if (findGroups != null){
            return findGroups.stream().map(dataTransformer::transformGroup).toList();
        }

        return Collections.emptyList();
    }

    public GroupDTO addMember(Long groupId, Long userId) {
        var group = groupRepository.findById(groupId).orElseThrow(() -> new RuntimeException("Grupo no encontrado"));

        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Grupo no encontrado"));

        group.getMembers().add(user);
        var saveGroup = groupRepository.save(group);
        return dataTransformer.transformGroup(saveGroup);

    }

    public GroupDTO addSpending(Long groupId, Long userId, SpendingDTO spending) {
        var group = groupRepository.findById(groupId).orElseThrow(() -> new RuntimeException("Grupo no encontrado"));

        var user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Grupo no encontrado"));

        var spend = new Spending(
                null,
                user,
                spending.description(),
                LocalDateTime.now(),
                spending.amount(),
                group
        );

        group.getSpending().add(spend);
        var saveGroup = groupRepository.save(group);
        return dataTransformer.transformGroup(saveGroup);
    }


    public GroupDTO addAnonMember(AnonymusUserDTO user, Long groupId) {
        var findGroup = groupRepository.findById(groupId).orElseThrow(() -> new RuntimeException("Grupo no encontrado"));

        User newAnon = User.createAnonymus(user.name());
        userRepository.save(newAnon);
        findGroup.getMembers().add(newAnon);
        groupRepository.save(findGroup);

        return dataTransformer.transformGroup(findGroup);
    }

    public GroupDTO getGroup(Long groupId) {
        var group = groupRepository.findById(groupId).orElseThrow(()-> new RuntimeException("Grupo no encontrado"));
        return dataTransformer.transformGroup(group);
    }
}
