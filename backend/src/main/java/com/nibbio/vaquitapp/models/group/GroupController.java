package com.nibbio.vaquitapp.models.group;

import com.nibbio.vaquitapp.models.spending.SpendingDTO;
import com.nibbio.vaquitapp.models.user.AnonymusUserDTO;
import com.nibbio.vaquitapp.models.user.User;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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
@SecurityRequirement(name = "bearer-key")
public class GroupController {

    private final GroupService groupService;

    @GetMapping
    public ResponseEntity<List<GroupDTO>> getGroups(@AuthenticationPrincipal User user){
        var groups = groupService.getGroups(user.getId());
        return ResponseEntity.ok().body(groups);
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<GroupDTO> getGroup(@PathVariable Long groupId){
        var group = groupService.getGroup(groupId);
        return ResponseEntity.ok().body(group);
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


    @PostMapping("/addUserAnon")
    public ResponseEntity<GroupDTO> addUserAnon(@RequestBody AnonymusUserDTO user, @RequestParam Long groupId){
        var newUser = groupService.addAnonMember(user, groupId);
        return ResponseEntity.ok().body(newUser);
    }

}
