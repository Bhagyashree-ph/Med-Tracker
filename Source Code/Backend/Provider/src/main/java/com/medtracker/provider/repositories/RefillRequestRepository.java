package com.medtracker.provider.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.medtracker.provider.entities.RefillRequestEO;

public interface RefillRequestRepository extends JpaRepository<RefillRequestEO, String> {

	@Query("SELECT rr FROM RefillRequestEO rr "
			+ "WHERE rr.requestType = :type")
	List<RefillRequestEO> findByRequestType(@Param(value = "type") String type);

}
