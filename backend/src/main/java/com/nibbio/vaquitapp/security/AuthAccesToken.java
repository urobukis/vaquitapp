package com.nibbio.vaquitapp.security;

import com.nibbio.vaquitapp.models.user.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthAccesToken {

    private TokenService tokenService;
    private UserRepository userRepository;

    public String refreshAccessToken(HttpServletRequest request, HttpServletResponse response){
        Cookie[] cookies = request.getCookies();
        if (cookies == null){
            throw new RuntimeException("No se encontro ninguna cookie");
        }

        String refreshToken = null;
        for (Cookie cookie:cookies){
            if ("rfr_token".equals(cookie.getName())){
                refreshToken = cookie.getValue();
                break;
            }
        }

        if (refreshToken==null){
            throw new RuntimeException("No se encontro el Refresh Token");
        }

        String email = tokenService.getSubject(refreshToken);
        var user = userRepository.findByEmail(email)
                .orElseThrow(()-> new RuntimeException("Usuario no encontradp"));

        if (!tokenService.isTokenValid(refreshToken, user)){
            throw new RuntimeException("Token expirado");
        }

        var newAccessToken = tokenService.generarToken(user);
        var newRefreshToken = tokenService.generarRefreshToken(user);
        Cookie refreshCookie = new Cookie("rfr_token", newRefreshToken);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(false);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(7 * 24 * 60 * 60);
        response.addCookie(refreshCookie);

        return newAccessToken;
    }
}
