package com.medtracker.pharmacy.service;

import java.util.List;

import com.medtracker.pharmacy.entities.RefillRequestEO;
import com.medtracker.pharmacy.entities.UserEO;

public interface PharmacyService {
	
	UserEO fetchUserById(String userId);

	List<RefillRequestEO> fetchAllRequests();
	
	RefillRequestEO fetchRequestById(String requestId);
	
	RefillRequestEO updateRequest(RefillRequestEO refillRequestEO);
}
