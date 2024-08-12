package com.medtracker.provider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medtracker.provider.entities.PatientEO;

public interface PatientRepository extends JpaRepository<PatientEO, String> {

}
