package com.triquang.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.triquang.exception.CommentException;
import com.triquang.model.Comment;
import com.triquang.model.Post;
import com.triquang.model.User;
import com.triquang.repository.CommentRepository;
import com.triquang.repository.PostRepository;
import com.triquang.service.CommentService;
import com.triquang.service.PostService;
import com.triquang.service.UserService;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private PostService postService;

	@Autowired
	private UserService userService;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private PostRepository postRepository;

	@Override
	public Comment createComment(Comment comment, Integer postId, Integer userId) {
		User user = userService.findUserById(userId);
		Post post = postService.findPostById(postId);
		comment.setUser(user);
		comment.setContent(comment.getContent());
		comment.setCreateAt(LocalDateTime.now());
		Comment saveComment = commentRepository.save(comment);
		post.getComments().add(saveComment);
		postRepository.save(post);
		return saveComment;
	}

	@Override
	public Comment likeComment(Integer commentId, Integer userId) {
		Comment comment = findCommentById(commentId);
		User user = userService.findUserById(userId);
		if (!comment.getLiked().contains(user)) {
			comment.getLiked().add(user);
		} else {
			comment.getLiked().remove(user);
		}

		return commentRepository.save(comment);
	}

	@Override
	public Comment findCommentById(Integer commentId) {
		Optional<Comment> optional = commentRepository.findById(commentId);
		if (optional.isEmpty()) {
			throw new CommentException("Comment not exist");
		}
		return optional.get();
	}

}
