package com.nibbio.vaquitapp.security;

import com.nibbio.vaquitapp.models.user.User;
import com.nibbio.vaquitapp.models.user.UserLoginDTO;
import com.nibbio.vaquitapp.models.user.UserRegisterDTO;
import com.nibbio.vaquitapp.models.user.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody UserLoginDTO data, HttpServletResponse response){
        Authentication token = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var authenticatedUser = authenticationManager.authenticate(token);
        var user = (User) authenticatedUser.getPrincipal();

        var jwtToken = tokenService.generarToken(user);
        var jwtTokenRefresh = tokenService.generarRefreshToken(user);

        Cookie refreshCookie = new Cookie("rfr_token", jwtTokenRefresh);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(7 * 24 * 60 * 60);
        response.addCookie(refreshCookie);

        var newToken = new DatosJWTToken(jwtToken);

        return ResponseEntity.ok().body(Map.of("token", newToken, "name", user.getName(), "image", user.getImage(), "id", user.getId()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegisterDTO data){
        System.out.println(data);
        var newUser = userService.userRegister(data);
        if (newUser != null){
            return ResponseEntity.ok("Usuario registrado con exito. Verifica tu correo");
        }
        return ResponseEntity.badRequest().body("Error al registrar: Ya existe un usuario con ese email.");
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshCookie(HttpServletRequest request, HttpServletResponse response){
        try {
            String token = tokenService.refreshAccessToken(request, response);
            return ResponseEntity.ok().body(Collections.singletonMap("token", token));
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", e.getMessage()));
        }
    }
}
