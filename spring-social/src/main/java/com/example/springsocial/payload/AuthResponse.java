package com.example.springsocial.payload;

import com.example.springsocial.model.User;

import java.util.Optional;

public class AuthResponse {
    private String accessToken;
    private Optional<User> user;

    public AuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Optional<User> getUser() {
        return user;
    }

    public void setUser(Optional<User> user) {
        this.user = user;
    }

    public AuthResponse(String accessToken, Optional<User> user) {
        this.accessToken = accessToken;
        this.user = user;
    }
}
