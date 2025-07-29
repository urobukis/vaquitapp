package com.nibbio.vaquitapp.models.group;

import com.nibbio.vaquitapp.models.spending.Spending;
import com.nibbio.vaquitapp.models.spending.SpendingDTO;
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
        var findUser = userRepository.findById(id);
        User myUser = findUser.orElse(null);
        List<User> members = new ArrayList<>();
        members.add(myUser);
        var newGroup = new Group(
                null,
                members,
                group.title(),
                null
        );
        assert myUser != null;
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
        var findGroup = groupRepository.findById(groupId);
        var group = findGroup.orElse(null);
        var findUser = userRepository.findById(userId);
        var user = findUser.orElse(null);

        assert group != null;
        group.getMembers().add(user);
        var saveGroup = groupRepository.save(group);
        return dataTransformer.transformGroup(saveGroup);

    }

    public GroupDTO addSpending(Long groupId, Long userId, SpendingDTO spending) {
        var findGroup = groupRepository.findById(groupId);
        var group = findGroup.orElse(null);
        var findUser = userRepository.findById(userId);
        var user = findUser.orElse(null);

        var spend = new Spending(
                null,
                user,
                spending.description(),
                LocalDateTime.now(),
                spending.amount(),
                group
        );

        assert group != null;
        group.getSpending().add(spend);
        var saveGroup = groupRepository.save(group);
        return dataTransformer.transformGroup(saveGroup);
    }


}
