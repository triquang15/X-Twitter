package com.triquang.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.triquang.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
	
}
