package com.triquang.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignUpRequest {

	@Email
	private String email;
	
	@NotBlank
	private String password;
	
	@NotBlank
	private String fullName;
	
	@NotBlank
	private String location;
	
	@NotBlank
	private String website;
	
	@NotBlank
	private String birthDate;

	@NotBlank
	private String phone;

}
