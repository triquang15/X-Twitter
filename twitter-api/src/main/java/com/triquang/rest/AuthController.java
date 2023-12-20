package com.triquang.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.triquang.exception.UserException;
import com.triquang.model.Premium;
import com.triquang.model.User;
import com.triquang.repository.UserRepository;
import com.triquang.request.LoginRequest;
import com.triquang.request.SignUpRequest;
import com.triquang.response.AuthResponse;
import com.triquang.security.TokenProvider;
import com.triquang.service.CustomUserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private TokenProvider tokenProvider;

	@Autowired
	private CustomUserService customUserService;

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler( @RequestBody SignUpRequest newUser)
			throws UserException {

		User isUser = userRepository.findByEmail(newUser.getEmail());
		if (isUser != null) {
			throw new UserException(String.format("Email %s already been used", isUser));
		}

		userRepository.save(mapSignUpRequestToUser(newUser));

		Authentication authentication = new UsernamePasswordAuthenticationToken(isUser,
				newUser.getPassword());
		SecurityContextHolder.getContext().setAuthentication(authentication);

		AuthResponse response = extractedJwtResponse(authentication);

		return new ResponseEntity<AuthResponse>(response, HttpStatus.ACCEPTED);

	}

	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> signInHandler(@Valid @RequestBody LoginRequest req) {
		String email = req.getEmail();
		String password = req.getPassword();

		Authentication authentication = authentication(email, password);
		SecurityContextHolder.getContext().setAuthentication(authentication);

		AuthResponse response = extractedJwtResponse(authentication);

		return new ResponseEntity<AuthResponse>(response, HttpStatus.ACCEPTED);
	}

	private User mapSignUpRequestToUser(SignUpRequest newUser) {
		User user = new User();
		user.setEmail(newUser.getEmail());
		user.setFullName(newUser.getFullName());
		user.setPassword(passwordEncoder.encode(newUser.getPassword()));
		user.setLocation(newUser.getLocation());
		user.setWebsite(newUser.getWebsite());
		user.setBirthDate(newUser.getBirthDate());
		user.setPhone(newUser.getPhone());
		user.setBackgroundImage(newUser.getBackgroundImage());
		user.setImage(newUser.getImage());
		user.setBio(newUser.getBio());		
		return user;
	}

	private AuthResponse extractedJwtResponse(Authentication authentication) {
		String jwt = tokenProvider.generateToken(authentication);
		AuthResponse response = new AuthResponse(jwt, true);
		return response;
	}

	public Authentication authentication(String username, String password) {
		UserDetails userDetails = customUserService.loadUserByUsername(username);
		if (userDetails == null) {
			throw new BadCredentialsException("Invalid username");
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid password or username");
		}

		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

}
