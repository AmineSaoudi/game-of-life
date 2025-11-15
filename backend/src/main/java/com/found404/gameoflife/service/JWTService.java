package com.found404.gameoflife.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {

    private String secretKey = "7Si88zdrvY18YlKl8FycPwnyH1giXOa3avawS93gKaE=";

    // public JWTService() {
    // try {
    // KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
    // // SecretKey sk = keyGen.generateKey();
    // // this.secretKey = Base64.getEncoder().encodeToString(sk.getEncoded());

    // } catch (NoSuchAlgorithmException e) {
    // throw new RuntimeException(e.getMessage());
    // }
    // }

    public String generateToken(String username) {

        Map<String, Object> claims = new HashMap<>();

        Date curDate = new Date(System.currentTimeMillis());
        Date expDate = new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7); // 1 week

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(curDate)
                .expiration(expDate)
                .and()
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        // extract the username from jwt token
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractUsername(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

}
