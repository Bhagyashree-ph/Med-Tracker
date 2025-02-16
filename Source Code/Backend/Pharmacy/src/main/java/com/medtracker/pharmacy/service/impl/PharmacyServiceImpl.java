package com.medtracker.pharmacy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medtracker.pharmacy.entities.RefillRequestEO;
import com.medtracker.pharmacy.entities.UserEO;
import com.medtracker.pharmacy.repositories.RefillResquestsRepository;
import com.medtracker.pharmacy.repositories.UserRepository;
import com.medtracker.pharmacy.service.PharmacyService;

@Service
public class PharmacyServiceImpl implements PharmacyService {
	
	@Autowired
	private RefillResquestsRepository refillReqRepo;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<RefillRequestEO> fetchAllRequests() {
		return refillReqRepo.findByRequestType();
	}

	@Override
	public RefillRequestEO fetchRequestById(String requestId) {
		return refillReqRepo.findById(requestId).get();
	}

	@Override
	public RefillRequestEO updateRequest(RefillRequestEO refillRequestEO) {
		return refillReqRepo.saveAndFlush(refillRequestEO);
	}

	@Override
	public UserEO fetchUserById(String userId) {
		// TODO Auto-generated method stub
		return userRepo.findById(userId).get();
	}

}
