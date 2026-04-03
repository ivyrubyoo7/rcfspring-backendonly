 package com.rcfl.rcfspring.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
public class TokenUtil {

    private final String SECRET_KEY = "mysecretkeymysecretkeymysecretkey12"; 
    // ⚠️ must be at least 32 chars for HS256

    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours

    /* =========================
       SIGNING KEY
       ========================= */

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    /* =========================
       GENERATE TOKEN
       ========================= */

    public String generateToken(UserDetails userDetails) {

        return Jwts.builder()
                .subject(userDetails.getUsername()) // email
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey())
                .compact();
    }

    /* =========================
       EXTRACT USERNAME
       ========================= */

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /* =========================
       EXTRACT EXPIRATION
       ========================= */

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /* =========================
       GENERIC CLAIM EXTRACTOR
       ========================= */

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        final Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /* =========================
       VALIDATE TOKEN
       ========================= */

    public boolean validateToken(String token, UserDetails userDetails) {

        final String username = extractUsername(token);

        return (username.equals(userDetails.getUsername())
                && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}