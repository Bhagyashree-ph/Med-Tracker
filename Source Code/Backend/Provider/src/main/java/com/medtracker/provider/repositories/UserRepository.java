package com.medtracker.provider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medtracker.provider.entities.UserEO;

public interface UserRepository extends JpaRepository<UserEO, String> {

}
