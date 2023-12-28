package com.triquang.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.triquang.exception.PostException;
import com.triquang.exception.UserException;
import com.triquang.model.Post;
import com.triquang.model.User;
import com.triquang.repository.PostRepository;
import com.triquang.repository.UserRepository;
import com.triquang.service.PostService;
import com.triquang.service.UserService;

@Service
public class PostServiceImpl implements PostService {
	@Autowired
	private PostRepository postRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@Override
	public Post createPost(Post post, Integer userId) throws UserException, PostException {

		Post newPost = new Post();

		newPost.setContent(post.getContent());
		newPost.setImage(post.getImage());
		newPost.setVideo(post.getVideo());
		newPost.setCreatedAt(LocalDateTime.now());
		newPost.setUser(userService.findUserById(userId));

		return postRepository.save(newPost);
	}

	@Override
	public String deletePost(Integer postId, Integer userId) throws UserException, PostException {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		if (post.getUser().getId() != user.getId()) {
			throw new PostException("Can't delete user post");
		}
		postRepository.delete(post);

		return "Post deleted successfully";
	}

	@Override
	public List<Post> findPostByUserId(Integer userId) throws UserException {

		return postRepository.findPostByUserId(userId);
	}

	@Override
	public Post findPostById(Integer postId) throws PostException {
		Optional<Post> optional = postRepository.findById(postId);
		if (optional.isEmpty()) {
			throw new PostException("Post not found with ID: " + postId);
		}
		return optional.get();
	}

	@Override
	public List<Post> findAllPost() throws PostException {
		return postRepository.findAll();
	}

	@Override
	public Post savePost(Integer postId, Integer userId) throws UserException, PostException {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);

		if (user.getSavedPost().contains(post)) {
			user.getSavedPost().remove(post);
		} else {
			user.getSavedPost().add(post);
		}
		userRepository.save(user);
		return post;
	}

	@Override
	public Post likePost(Integer postId, Integer userId) throws UserException, PostException {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);

		if (post.getLikedPost().contains(user)) {
			post.getLikedPost().remove(user);
		} else {
			post.getLikedPost().add(user);
		}
		return postRepository.save(post);
	}
}
