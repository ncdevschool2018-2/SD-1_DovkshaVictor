package com.netcracker.viktuk.pman.backend.controller;

import com.netcracker.viktuk.pman.backend.entity.User;
import com.netcracker.viktuk.pman.backend.entity.enums.Role;
import com.netcracker.viktuk.pman.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private UserService userService;
    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<User> add(@AuthenticationPrincipal User user_auth, @RequestBody User user) {
        if(user_auth.getRole()!= Role.ADMIN) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        userService.addUser(user);
        return ResponseEntity.ok(user);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<User> getYourself(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(user);
    }
}
