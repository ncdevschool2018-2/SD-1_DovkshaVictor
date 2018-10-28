package com.netcracker.viktuk.pman.backend.controller;

import com.netcracker.viktuk.pman.backend.entity.User;
import com.netcracker.viktuk.pman.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<User> add(@RequestBody User user) {
        userService.addUser(user);
        return ResponseEntity.ok(user);
    }
}
