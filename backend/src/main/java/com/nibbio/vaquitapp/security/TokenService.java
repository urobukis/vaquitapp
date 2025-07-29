package com.nibbio.vaquitapp.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.nibbio.vaquitapp.models.user.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;

@Service
public class TokenService {

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
}
