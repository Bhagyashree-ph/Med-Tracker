package com.medtracker.admin.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medtracker.admin.entities.UserEO;

public interface UserRepository extends JpaRepository<UserEO, String> {

}
