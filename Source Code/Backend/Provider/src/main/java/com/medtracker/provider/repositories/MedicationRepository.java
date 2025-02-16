package com.medtracker.provider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medtracker.provider.entities.MedicationDetailEO;

public interface MedicationRepository extends JpaRepository<MedicationDetailEO, Integer> {

}
