package com.nibbio.vaquitapp.models.group;

import com.nibbio.vaquitapp.models.spending.SpendingDTO;
import com.nibbio.vaquitapp.models.user.UserDTO;

import java.util.List;

public record GroupResponseDTO(String title, List<UserDTO> members, List<SpendingDTO> spending) {
}
