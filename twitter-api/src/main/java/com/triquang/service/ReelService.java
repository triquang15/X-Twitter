package com.triquang.service;

import java.util.List;

import com.triquang.model.Reel;
import com.triquang.model.User;

public interface ReelService {
	public Reel createReel(Reel reel, User user);

	public List<Reel> findAllReels();

	public List<Reel> findUserReel(Integer userId);
}
