package com.medtracker.patient.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medtracker.patient.entities.HospitalEO;

public interface HospitalRepository extends JpaRepository<HospitalEO, String> {

}
