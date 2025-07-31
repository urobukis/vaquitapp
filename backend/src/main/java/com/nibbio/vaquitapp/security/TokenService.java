package com.nibbio.vaquitapp.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.nibbio.vaquitapp.models.user.User;
import com.nibbio.vaquitapp.models.user.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final UserRepository userRepository;

    @Value("${MYSQL_PASSWORD}")
    private String apikey;

    @Value("${MYSQL_DATABASE}")
    private String database;

    public String generarToken(User user){
        try{
            Algorithm algorithm = Algorithm.HMAC256(apikey);
            Instant expiration = getExpirationFifteenMinutes();
            String token =  JWT.create()
                    .withIssuer(database)
                    .withSubject(user.getEmail())
                    .withExpiresAt(getExpirationFifteenMinutes())
                    .sign(algorithm);

            System.out.println("Token acces: " + expiration);
            return token;
        }catch (JWTCreationException exception){
            throw new RuntimeException();
        }
    }

    public String generarRefreshToken(User user){
        try{
            Algorithm algorithm = Algorithm.HMAC256(apikey);
            Instant expiration = getExpirationSevenDays();
            String token = JWT.create()
                    .withIssuer(database)
                    .withSubject(user.getEmail())
                    .withExpiresAt(expiration)
                    .sign(algorithm);

            System.out.println("Refresh token: " + expiration);
            return token;
        }catch (JWTCreationException exception){
            throw new RuntimeException();
        }
    }

    private Instant getExpirationFifteenMinutes(){
        return Instant.now().plus(Duration.ofMinutes(120));
    }

    private Instant getExpirationSevenDays(){
        return Instant.now().plus(Duration.ofDays(7));
    }

    public String getSubject(String token){
        DecodedJWT verifier=null;
        try {
            Algorithm algorithm = Algorithm.HMAC256(apikey);
            verifier = JWT.require(algorithm)
                    .withIssuer(database)
                    .build()
                    .verify(token);
        }catch (JWTCreationException exception){
            System.out.println(exception.toString());
        }
        if (verifier.getSubject()==null){
            throw new RuntimeException("Verifier invalido");
        }
        return verifier.getSubject();
    }

    public boolean isTokenValid(String token, User user){
        try{
            Algorithm algorithm = Algorithm.HMAC256(apikey);
            DecodedJWT jwt = JWT.require(algorithm)
                    .withIssuer(database)
                    .build()
                    .verify(token);

            String subject = jwt.getSubject();
            return subject.equals(user.getEmail()) && jwt.getExpiresAt().after(new Date());
        }catch (JWTCreationException e){
            return false;
        }
    }

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

        String email = getSubject(refreshToken);
        var user = userRepository.findByEmail(email)
                .orElseThrow(()-> new RuntimeException("Usuario no encontradp"));

        if (!isTokenValid(refreshToken, user)){
            throw new RuntimeException("Token expirado");
        }

        var newAccessToken = generarToken(user);
        var newRefreshToken = generarRefreshToken(user);
        Cookie refreshCookie = new Cookie("rfr_token", newRefreshToken);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(false);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(7 * 24 * 60 * 60);
        response.addCookie(refreshCookie);

        return newAccessToken;
    }
}
