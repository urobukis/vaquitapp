package com.nibbio.vaquitapp.models.group;

import com.nibbio.vaquitapp.models.spending.SpendingDTO;
import com.nibbio.vaquitapp.models.spending.SpendingResponseDTO;
import com.nibbio.vaquitapp.models.user.UserDTO;

import java.util.List;

public record GroupDTO(
        Long id,
        String title,
        List<UserDTO> members,
        List<SpendingResponseDTO> spending
) {
}
