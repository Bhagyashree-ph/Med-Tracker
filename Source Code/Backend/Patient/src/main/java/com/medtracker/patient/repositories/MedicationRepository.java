package com.medtracker.patient.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medtracker.patient.entities.MedicationDetailEO;

public interface MedicationRepository extends JpaRepository<MedicationDetailEO, Integer> {

}
