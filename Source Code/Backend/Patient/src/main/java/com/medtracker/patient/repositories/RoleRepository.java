package com.medtracker.patient.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medtracker.patient.entities.RoleEO;

public interface RoleRepository extends JpaRepository<RoleEO, String> {

}
