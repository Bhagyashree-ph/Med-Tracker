package com.medtracker.patient.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.medtracker.patient.entities.RefillRequestEO;

public interface RefillRequestRepository extends JpaRepository<RefillRequestEO, String> {

	@Query("SELECT rr FROM RefillRequestEO rr " +
            "WHERE rr.patient.patientId = :patientId")
	List<RefillRequestEO> findAllByPatientId(@Param("patientId") String patientId);

}
