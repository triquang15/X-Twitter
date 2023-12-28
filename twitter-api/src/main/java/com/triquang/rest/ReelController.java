package com.triquang.rest;

import static com.triquang.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.triquang.model.Post;
import com.triquang.model.Reel;
import com.triquang.model.User;
import com.triquang.service.ReelService;
import com.triquang.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/reels")
public class ReelController {
	@Autowired
	private ReelService reelService;

	@Autowired
	private UserService userService;

	@PostMapping("/create")
	public ResponseEntity<Reel> createReel(@RequestBody Reel reel, @RequestHeader("Authorization") String token) {

		User user = userService.findUserProfile(token);
		Reel createReel = reelService.createReel(reel, user);
		return new ResponseEntity<>(createReel, HttpStatus.CREATED);
	}

	@Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
	@GetMapping
	public ResponseEntity<List<Reel>> findAllReel() {
		List<Reel> reels = reelService.findAllReels();

		return new ResponseEntity<List<Reel>>(reels, HttpStatus.OK);
	}

	@Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Reel>> findUserReels(@PathVariable Integer userId) {
		List<Reel> listReels = reelService.findUserReel(userId);
		return new ResponseEntity<>(listReels, HttpStatus.OK);
	}
}
