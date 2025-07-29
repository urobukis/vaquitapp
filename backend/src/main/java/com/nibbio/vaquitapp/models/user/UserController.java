package com.nibbio.vaquitapp.models.user;

import com.nibbio.vaquitapp.models.group.GroupRequestDTO;
import com.nibbio.vaquitapp.models.group.GroupResponseDTO;
import com.nibbio.vaquitapp.models.group.GroupService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Transactional
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final GroupService groupService;
    private final UserService userService;

    @PostMapping("/addGroup")
    public ResponseEntity<GroupResponseDTO> createGroup(@RequestBody GroupRequestDTO group, @AuthenticationPrincipal User user){
        var newGroup = groupService.createGroup(group, user.getId());
        return ResponseEntity.ok().body(newGroup);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDTO>> getUsers(@RequestParam String name){
        var users = userService.searchByName(name);
        return ResponseEntity.ok().body(users);
    }
}
