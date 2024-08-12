package com.medtracker.admin.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medtracker.admin.entities.RoleEO;

public interface RoleRepository extends JpaRepository<RoleEO, String> {

}
