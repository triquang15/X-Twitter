package com.triquang.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class Premium {
	private boolean status = false;
	private LocalDateTime startedAt;
	private LocalDateTime enddAt;
	private String planType;

}
