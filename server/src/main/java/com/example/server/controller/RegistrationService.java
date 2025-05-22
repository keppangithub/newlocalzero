package main.java.com.example.server.controller;

import main.java.com.example.server.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RegistrationService {
    @Autowired
    private UserRepository userRepository;

        public boolean registerUser(Map<String, String> userInfo){
            RegistrationHandler handler = new UsernameValidationHandler();

            handler.setNext(new PasswordValidationHandler())
                    .setNext(new EmailValidationHandler())
                    .setNext(new EmailUniquenessHandler(userRepository))
                    .setNext(new RoleValidationHandler());

            boolean result = handler.handle(userInfo);

            if(!result){
                return false;
            }

            String username = userInfo.get("username");
            String password = userInfo.get("password");
            String email = userInfo.get("email");
            int location = Integer.parseInt(userInfo.get("location"));
            String role = userInfo.get("role");

            User newUser = new User(username, password, email, location, role);
            User savedUser = userRepository.save(newUser);

            return savedUser != null;

        }

}
