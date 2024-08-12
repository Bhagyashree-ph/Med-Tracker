package com.medtracker.patient.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.medtracker.patient.entities.PrescMedMappingEO;
import com.medtracker.patient.entities.PrescriptionDetailEO;

public interface PrescriptionRepository extends JpaRepository<PrescriptionDetailEO, Integer> {


	@Query("SELECT pd FROM PrescriptionDetailEO pd " 
			+ "WHERE pd.patient.patientId = :patientId")
	List<PrescriptionDetailEO> findAllByPatientId(@Param("patientId") String patientId);
}
