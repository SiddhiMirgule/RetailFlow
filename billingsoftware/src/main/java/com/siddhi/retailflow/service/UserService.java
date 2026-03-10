package com.siddhi.retailflow.service;

import com.siddhi.retailflow.io.UserRequest;
import com.siddhi.retailflow.io.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest request);
     String getUserRole (String email);
     List<UserResponse> readUsers();

     void deleteUser(String id);
}
