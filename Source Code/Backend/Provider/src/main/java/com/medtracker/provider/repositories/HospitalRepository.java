package com.medtracker.provider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medtracker.provider.entities.HospitalEO;

public interface HospitalRepository extends JpaRepository<HospitalEO, String> {

}
