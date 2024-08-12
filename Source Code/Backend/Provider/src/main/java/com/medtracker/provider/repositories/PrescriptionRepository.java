package com.medtracker.provider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medtracker.provider.entities.PrescriptionDetailEO;

public interface PrescriptionRepository extends JpaRepository<PrescriptionDetailEO, Integer> {

}
