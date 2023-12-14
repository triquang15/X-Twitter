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
import com.triquang.model.User;
import com.triquang.repository.UserRepository;
import com.triquang.request.LoginRequest;
import com.triquang.request.SignUpRequest;
import com.triquang.response.AuthResponse;
import com.triquang.security.TokenProvider;
import com.triquangservice.UserDetailsServiceImpl;

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
	private UserDetailsServiceImpl userDetailsService;

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@Valid @RequestBody SignUpRequest signUpRequest)
			throws UserException {

		if (userRepository.hasUserWithEmail(signUpRequest.getEmail())) {
			throw new UserException(String.format("Email %s already been used", signUpRequest.getEmail()));
		}

		userRepository.save(mapSignUpRequestToUser(signUpRequest));

		Authentication authentication = new UsernamePasswordAuthenticationToken(signUpRequest.getEmail(),
				signUpRequest.getPassword());
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

	private User mapSignUpRequestToUser(SignUpRequest signUpRequest) {
		User user = new User();
		user.setEmail(signUpRequest.getEmail());
		user.setFullName(signUpRequest.getFullName());
		user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
		user.setLocation(signUpRequest.getLocation());
		user.setWebsite(signUpRequest.getWebsite());
		user.setBirthDate(signUpRequest.getBirthDate());
		user.setPassword(signUpRequest.getPhone());
		return user;
	}

	private AuthResponse extractedJwtResponse(Authentication authentication) {
		String jwt = tokenProvider.generateToken(authentication);
		AuthResponse response = new AuthResponse(jwt, true);
		return response;
	}

	public Authentication authentication(String username, String password) {
		UserDetails userDetails = userDetailsService.loadUserByUsername(username);
		if (userDetails == null) {
			throw new BadCredentialsException("Invalid username");
		}
		if (!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid password or username");
		}

		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}

}
