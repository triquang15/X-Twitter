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

import com.triquang.dto.PostDto;
import com.triquang.dto.mapper.PostDtoMapper;
import com.triquang.exception.PostException;
import com.triquang.exception.UserException;
import com.triquang.model.Post;
import com.triquang.model.User;
import com.triquang.request.PostReplyRequest;
import com.triquang.response.ApiResponse;
import com.triquang.service.PostService;
import com.triquang.service.UserService;

@RestController
@RequestMapping("/api/posts")
public class PostController {
	@Autowired
	private PostService postService;

	@Autowired
	private UserService userService;

	@PostMapping("/create")
	public ResponseEntity<PostDto> createPost(@RequestBody Post req, @RequestHeader("Authorization") String jwt)
			throws UserException {

		User user = userService.findUserProfile(jwt);
		Post post = postService.createPost(req, user);

		PostDto postDto = PostDtoMapper.toPostDto(post, user);

		return new ResponseEntity<>(postDto, HttpStatus.CREATED);

	}

	@PostMapping("/reply")
	public ResponseEntity<PostDto> replyPost(@RequestBody PostReplyRequest req,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException {

		User user = userService.findUserProfile(jwt);
		Post post = postService.createReply(req, user);

		PostDto postDto = PostDtoMapper.toPostDto(post, user);

		return new ResponseEntity<>(postDto, HttpStatus.CREATED);

	}

	@PutMapping("/{postId}/repost")
	public ResponseEntity<PostDto> rePostHandler(@PathVariable Long postId, @RequestHeader("Authorization") String jwt)
			throws UserException, PostException {

		User user = userService.findUserProfile(jwt);
		Post post = postService.rePost(postId, user);

		PostDto postDto = PostDtoMapper.toPostDto(post, user);

		return new ResponseEntity<>(postDto, HttpStatus.OK);

	}

	@GetMapping("/{postId}")
	public ResponseEntity<PostDto> findPostById(@PathVariable Long postId, @RequestHeader("Authorization") String jwt)
			throws UserException, PostException {

		User user = userService.findUserProfile(jwt);
		Post post = postService.findById(postId);

		PostDto postDto = PostDtoMapper.toPostDto(post, user);

		return new ResponseEntity<>(postDto, HttpStatus.OK);

	}

	@DeleteMapping("/{postId}")
	public ResponseEntity<ApiResponse> deletePostHandler(@PathVariable Long postId,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException {

		User user = userService.findUserProfile(jwt);
		postService.deletePostById(postId, user.getId());

		ApiResponse response = new ApiResponse("Post deleted successfully", true);

		return new ResponseEntity<>(response, HttpStatus.OK);

	}

	@GetMapping("/")
	public ResponseEntity<List<PostDto>> getAllPosts(@RequestHeader("Authorization") String jwt)
			throws UserException, PostException {

		User user = userService.findUserProfile(jwt);
		List<Post> posts = postService.findAllPost();

		List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, user);

		return new ResponseEntity<>(postDtos, HttpStatus.OK);

	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<PostDto>> getUserAllPosts(@PathVariable Long userId,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException {

		User user = userService.findUserProfile(jwt);
		List<Post> posts = postService.getUserPost(user);

		List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, user);

		return new ResponseEntity<>(postDtos, HttpStatus.OK);

	}

	@GetMapping("/user/{userId}/likes")
	public ResponseEntity<List<PostDto>> findPostByLikesContainersUser(@PathVariable Long userId,
			@RequestHeader("Authorization") String jwt) throws UserException, PostException {

		User user = userService.findUserProfile(jwt);
		List<Post> posts = postService.findByLikesUser(user);
		List<PostDto> postDtos = PostDtoMapper.toPostDtos(posts, user);

		return new ResponseEntity<>(postDtos, HttpStatus.OK);

	}

}
