package com.triquang.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.triquang.exception.PostException;
import com.triquang.exception.UserException;
import com.triquang.model.Post;
import com.triquang.model.User;
import com.triquang.repository.PostRepository;
import com.triquang.request.PostReplyRequest;
import com.triquang.service.PostService;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostRepository postRepository;

	@Override
	public Post createPost(Post req, User user) throws UserException {
		Post post = new Post();
		post.setContent(req.getContent());
		post.setCreatedAt(LocalDateTime.now());
		post.setImage(req.getImage());
		post.setUser(user);
		post.setReply(false);
		post.setPost(true);
		post.setVideo(req.getVideo());

		return postRepository.save(post);
	}

	@Override
	public List<Post> findAllPost() {

		return postRepository.findAllByIsPostTrueOrderByCreatedAtDesc();
	}

	@Override
	public Post rePost(Long postId, User user) throws UserException, PostException {
		Post post = findById(postId);
		if (post.getRePostUsers().contains(user)) {
			post.getRePostUsers().remove(user);
		} else {
			post.getRePostUsers().add(user);
		}
		return postRepository.save(post);
	}

	@Override
	public Post findById(Long postId) throws PostException {
		Post post = postRepository.findById(postId)
				.orElseThrow(() -> new PostException("Post not found with id " + postId));
		return post;
	}

	@Override
	public void deletePostById(Long postId, Long userId) throws UserException, PostException {
		Post post = findById(postId);
		if (!userId.equals(post.getUser().getId())) {
			throw new UserException("You can't delete another user post");
		}

		postRepository.deleteById(post.getId());

	}

	@Override
	public Post createReply(PostReplyRequest req, User user) throws PostException {
		Post replyFor = findById(req.getPostId());

		Post post = new Post();
		post.setContent(req.getContent());
		post.setCreatedAt(LocalDateTime.now());
		post.setImage(req.getImage());
		post.setUser(user);
		post.setReply(true);
		post.setPost(false);
		post.setReplyFor(replyFor);

		Post savedReply = postRepository.save(post);
		post.getRepPosts().add(savedReply);
		postRepository.save(replyFor);

		return replyFor;
	}

	@Override
	public List<Post> getUserPost(User user) {
		
		return postRepository.findByRePostUsersContainsOrUser_IdAndIsPostTrueOrderByCreatedAtDesc(user, user.getId());
	}

	@Override
	public List<Post> findByLikesUser(User user) {
		
		return postRepository.findByLikesUserId(user.getId());
	}

}
