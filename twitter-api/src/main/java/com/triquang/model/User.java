package com.triquang.model;

import java.util.ArrayList;
import java.util.List;

import com.triquang.security.oauth2.OAuth2Provider;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = "username"),
		@UniqueConstraint(columnNames = "email") })
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String username;
	private String password;
	private String name;
	private String email;
	private String role;
	private String imageUrl;
	private String gender;
	
	private List<Integer> followers = new ArrayList<>();
	private List<Integer> followings = new ArrayList<>();

	@Enumerated(EnumType.STRING)
	private OAuth2Provider provider;

	private String providerId;

	@ManyToMany
	private List<Post> savedPost = new ArrayList<>();

	public User(String username, String password, String name, String email, String role, String imageUrl,
			String gender, OAuth2Provider provider, String providerId) {
		this.username = username;
		this.password = password;
		this.name = name;
		this.email = email;
		this.role = role;
		this.imageUrl = imageUrl;
		this.gender = gender;
		this.provider = provider;
		this.providerId = providerId;
	}
}
