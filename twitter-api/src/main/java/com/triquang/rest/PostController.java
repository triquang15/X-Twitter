package com.triquang.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.triquang.exception.PostException;
import com.triquang.exception.UserException;
import com.triquang.model.Post;
import com.triquang.model.User;
import com.triquang.response.ApiResponse;
import com.triquang.service.PostService;
import com.triquang.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import static com.triquang.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RestController
@RequestMapping("/api/posts")
public class PostController {

	@Autowired
	private PostService postService;
	
	@Autowired
	private UserService userService;

	@PostMapping("/create")
	public ResponseEntity<Post> createPost(@RequestBody Post post, @RequestHeader("Authorization") String token)
			throws UserException, PostException {
		User userReq = userService.findUserProfile(token);
		Post createPost = postService.createPost(post, userReq.getId());

		return new ResponseEntity<>(createPost, HttpStatus.CREATED);
	}

	@Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
	@DeleteMapping("/{postId}/user/{userId}")
	public ResponseEntity<ApiResponse> deletePost(@PathVariable Integer postId, @PathVariable Integer userId)
			throws UserException, PostException {
		String message = postService.deletePost(postId, userId);
		ApiResponse response = new ApiResponse(message, false);

		return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
	}

	@Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
	@GetMapping("/{postId}")
	public ResponseEntity<Post> findPostById(@PathVariable Integer postId) throws PostException {
		Post post = postService.findPostById(postId);
		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);

	}

	@Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Post>> findUserPost(@PathVariable Integer userId) throws UserException {
		List<Post> posts = postService.findPostByUserId(userId);

		return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
	}

	@Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
	@GetMapping
	public ResponseEntity<List<Post>> findAllPost() throws PostException {
		List<Post> posts = postService.findAllPost();

		return new ResponseEntity<List<Post>>(posts, HttpStatus.OK);
	}

	@Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
	@PutMapping("/{postId}/user/{userId}")
	public ResponseEntity<Post> savePostHandler(@PathVariable Integer postId, @PathVariable Integer userId)
			throws PostException, UserException {
		Post post = postService.savePost(postId, userId);
		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);

	}

	@Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
	@PutMapping("/like/{postId}")
	public ResponseEntity<Post> likePostHandler(@PathVariable Integer postId, @RequestHeader("Authorization") String token)
			throws PostException, UserException {
		User userReq = userService.findUserProfile(token);
		Post post = postService.likePost(postId, userReq.getId());
		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);

	}
}
