package com.triquang.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.triquang.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	public User findByEmail(String email);

	boolean existsByEmail(String email);

	boolean existsByUsername(String username);

	Optional<User> findByUsername(String username);

	@Query("SELECT u FROM User u WHERE u.name LIKE %:query% OR u.email = %:query%")
	public List<User> searchUser(@Param("query") String query);
}
