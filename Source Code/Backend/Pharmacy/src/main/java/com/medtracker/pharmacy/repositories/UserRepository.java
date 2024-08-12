package com.medtracker.pharmacy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medtracker.pharmacy.entities.UserEO;

public interface UserRepository extends JpaRepository<UserEO, String> {

}
