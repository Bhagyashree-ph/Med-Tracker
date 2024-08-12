package com.medtracker.patient.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medtracker.patient.entities.PharmacieSEO;

public interface PharmacyRepository extends JpaRepository<PharmacieSEO, String> {

}
