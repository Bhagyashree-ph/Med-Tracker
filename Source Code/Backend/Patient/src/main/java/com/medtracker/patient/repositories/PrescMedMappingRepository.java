package com.medtracker.patient.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.medtracker.patient.entities.PrescMedMappingEO;
import com.medtracker.patient.entities.PrescriptionDetailEO;

public interface PrescMedMappingRepository extends JpaRepository<PrescMedMappingEO, Integer> {

	@Query("SELECT pm FROM PrescMedMappingEO pm " + "WHERE pm.prescriptionDetails.prescriptionId = :prescriptionId")
	List<PrescMedMappingEO> findAllByPrescriptionId(@Param("prescriptionId") Integer prescriptionId);

	@Query("SELECT pmm FROM PrescMedMappingEO pmm " + "JOIN pmm.prescriptionDetails pd " + "JOIN pd.patient pdt "
			+ "WHERE pdt.patientId = :patientId")
	List<PrescMedMappingEO> findAllByPatientId(@Param("patientId") String patientId);

}
