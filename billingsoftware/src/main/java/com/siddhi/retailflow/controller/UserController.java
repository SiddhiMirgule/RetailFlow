package com.siddhi.retailflow.controller;

import com.siddhi.retailflow.io.UserRequest;
import com.siddhi.retailflow.io.UserResponse;
import com.siddhi.retailflow.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")                                                        // ✅ Fixed: dot -> slash
    public UserResponse registerUser(@RequestBody UserRequest request) {
        try {
            return userService.createUser(request);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,               // ✅ Fixed: dot -> comma
                    "Unable to create user " + e.getMessage());
        }
    }

    @GetMapping("/users")
    public List<UserResponse> readUsers() {
        return userService.readUsers();
    }

    @DeleteMapping("/users/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable String id) {                               // ✅ Fixed: vod -> void, string -> String
        try {
            userService.deleteUser(id);                                             // ✅ Fixed: correct casing
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,                 // ✅ Fixed: correct casing
                    "User not found");
        }
    }
}