package com.triquang.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignUpRequest {
	@NotBlank
	private String fullName;
	@NotBlank
	private String location;
	@NotBlank
	private String website;
	@NotBlank
	private String birthDate;

	@Email
	private String email;
	@NotBlank
	private String password;
	@NotBlank
	private String phone;
	@NotBlank
	private String image;
	@NotBlank
	private String backgroundImage;
	@NotBlank
	private String bio;
}
