package com.medtracker.patient.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.medtracker.patient.entities.PatientEO;

public interface PatientRepository extends JpaRepository<PatientEO, String> {

	@Query("SELECT p FROM PatientEO p WHERE p.user.userId = :userId")
	PatientEO findByUserId(@Param("userId") String userId);

}
