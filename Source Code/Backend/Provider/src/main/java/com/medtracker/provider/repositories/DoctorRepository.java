package com.medtracker.provider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medtracker.provider.entities.DoctorEO;

public interface DoctorRepository extends JpaRepository<DoctorEO, String> {

}
