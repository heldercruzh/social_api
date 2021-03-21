package com.example.springsocial.controller;

import com.example.springsocial.exception.ResourceNotFoundException;
import com.example.springsocial.model.User;
import com.example.springsocial.repository.UserRepository;
import com.example.springsocial.security.CurrentUser;
import com.example.springsocial.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/user")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getUser() {
        return ResponseEntity.ok("ROLE_USER");
    }

    @GetMapping("/user/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAdmin() {
        return ResponseEntity.ok( "ROLE_USER");
    }

}
