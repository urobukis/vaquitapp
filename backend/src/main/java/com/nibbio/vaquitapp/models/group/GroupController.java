package com.nibbio.vaquitapp.models.group;

import com.nibbio.vaquitapp.models.spending.SpendingDTO;
import com.nibbio.vaquitapp.models.user.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groups")
@Transactional
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @GetMapping
    public ResponseEntity<List<GroupDTO>> getGroups(@AuthenticationPrincipal User user){
        System.out.println(user.getId());
        var groups = groupService.getGroups(user.getId());
        return ResponseEntity.ok().body(groups);
    }


    @PostMapping("/addMember")
    public ResponseEntity<GroupDTO> addMember(@RequestParam Long groupId, @RequestParam Long userId){
        var group = groupService.addMember(groupId, userId);
        return ResponseEntity.ok().body(group);
    }

    @PostMapping("/addSpending")
    public ResponseEntity<GroupDTO> addSpending(@RequestParam Long groupId, @RequestParam Long userId, @RequestBody SpendingDTO spending){
        var spend = groupService.addSpending(groupId, userId, spending);
        return ResponseEntity.ok().body(spend);
    }



}
