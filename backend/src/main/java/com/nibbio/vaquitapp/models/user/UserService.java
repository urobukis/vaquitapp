package com.nibbio.vaquitapp.models.user;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public User userRegister(UserRegisterDTO dto){
        var findUser = userRepository.findByEmail(dto.email());
        if (findUser.isEmpty()){
            var newUser = new User(
                    null,
                    dto.name(),
                    dto.email(),
                    passwordEncoder.encode(dto.password()),
                    "https://res.cloudinary.com/du6ogdmyf/image/upload/v1752501748/JumpStart/icons8-usuario-masculino-en-c%C3%ADrculo-64_silvoo.png",
                    null
            );
            return userRepository.save(newUser);
        }
        return null;
    }
}
