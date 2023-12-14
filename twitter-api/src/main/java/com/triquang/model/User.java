package com.triquang.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String fullName;
	private String location;
	private String website;
	private String birthDate;
	private String email;
	private String password;
	private String phone;
	private String image;
	private String backgroundImage;
	private String bio;
	private boolean req_user;
	private boolean login_google;
	
	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Post> posts = new ArrayList<>();
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Like> likes = new ArrayList<>();
	
	@Embedded
	private Premium premium;
	
	@JsonIgnore
	@ManyToMany
	private List<User> followers = new ArrayList<>();
	
	@JsonIgnore
	@ManyToMany
	private List<User> followings = new ArrayList<>();
}
