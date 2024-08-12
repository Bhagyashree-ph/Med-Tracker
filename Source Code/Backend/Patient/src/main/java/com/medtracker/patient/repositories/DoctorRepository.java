package com.medtracker.patient.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medtracker.patient.entities.DoctorEO;

public interface DoctorRepository extends JpaRepository<DoctorEO, String> {

}
