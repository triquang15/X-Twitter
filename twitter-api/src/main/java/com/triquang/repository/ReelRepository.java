package com.triquang.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.triquang.model.Reel;

public interface ReelRepository extends JpaRepository<Reel, Integer> {
	public List<Reel> findByUserId(Integer userId);
}
