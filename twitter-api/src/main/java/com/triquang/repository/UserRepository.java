package com.triquang.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.triquang.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	public User findByEmail(String email);
	
	@Query("SELECT DISTINCT u FROM User u WHERE u.fullName LIKE %:keyword% OR u.email LIKE %:keyword%")
	public List<User> searchUser(@Param("keyword") String keyword);
}
