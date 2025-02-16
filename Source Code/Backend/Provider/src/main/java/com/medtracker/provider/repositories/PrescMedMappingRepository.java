package com.medtracker.provider.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.medtracker.provider.entities.PrescMedMappingEO;

public interface PrescMedMappingRepository extends JpaRepository<PrescMedMappingEO, Integer> {

	 @Query("SELECT pmm FROM PrescMedMappingEO pmm " +
            "JOIN pmm.prescriptionDetails pd " +
            "JOIN pd.patient pdt " +
            "WHERE pdt.patientId = :patientId")
    List<PrescMedMappingEO> findByPatientId(@Param("patientId") String patientId);

}
