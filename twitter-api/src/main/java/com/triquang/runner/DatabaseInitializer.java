package com.triquang.runner;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.triquang.model.User;
import com.triquang.security.WebSecurityConfig;
import com.triquang.security.oauth2.OAuth2Provider;
import com.triquang.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userService.getUsers().isEmpty()) {
            return;
        }
        USERS.forEach(user -> {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.registerUser(user);
        });
  
        log.info("Database initialized");
    }

    private static final List<User> USERS = Arrays.asList(
            new User("triquang95", "12345678", "Tri Quang", "triquang@gmail.com", WebSecurityConfig.ADMIN, "https://cdn.pixabay.com/photo/2023/10/05/17/54/geese-8296524_1280.jpg", "12-09-1990", OAuth2Provider.LOCAL, "1"),
            new User("obama81", "12345678", "Brack Obama1", "abama1@gmail.com", WebSecurityConfig.USER,"https://cdn.pixabay.com/photo/2023/11/29/12/29/cartoon-8419487_1280.jpg", "12-09-1990",OAuth2Provider.LOCAL, "2"),
            new User("obama82", "12345678", "Brack Obama2", "abama2@gmail.com", WebSecurityConfig.USER,"https://cdn.pixabay.com/photo/2023/11/29/12/29/cartoon-8419487_1280.jpg", "12-09-1990",OAuth2Provider.LOCAL, "2"),
            new User("obama83", "12345678", "Brack Obama3", "abama3@gmail.com", WebSecurityConfig.USER,"https://cdn.pixabay.com/photo/2023/11/29/12/29/cartoon-8419487_1280.jpg", "12-09-1990",OAuth2Provider.LOCAL, "2"),
            new User("obama84", "12345678", "Brack Obama4", "abama4@gmail.com", WebSecurityConfig.USER,"https://cdn.pixabay.com/photo/2023/11/29/12/29/cartoon-8419487_1280.jpg", "12-09-1990",OAuth2Provider.LOCAL, "2")
    );

}
