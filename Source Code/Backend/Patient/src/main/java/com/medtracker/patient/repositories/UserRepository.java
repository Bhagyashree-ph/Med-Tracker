package com.medtracker.patient.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medtracker.patient.entities.UserEO;

public interface UserRepository extends JpaRepository<UserEO, String> {

}
