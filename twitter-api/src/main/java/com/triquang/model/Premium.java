package com.triquang.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Premium {	
	private LocalDateTime startedAt;
	private LocalDateTime endAt;
	private String planType;
	private Boolean status = false;

}
