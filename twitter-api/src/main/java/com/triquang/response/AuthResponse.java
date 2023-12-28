package com.triquang.response;

public record AuthResponse(String jwt, boolean status, String message) {}
