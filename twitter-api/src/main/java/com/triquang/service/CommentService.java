package com.triquang.service;

import com.triquang.model.Comment;

public interface CommentService {
	public Comment createComment(Comment comment, Integer postId, Integer userId);
	public Comment likeComment(Integer commentId, Integer userId);
	public Comment findCommentById(Integer commentId);
}
