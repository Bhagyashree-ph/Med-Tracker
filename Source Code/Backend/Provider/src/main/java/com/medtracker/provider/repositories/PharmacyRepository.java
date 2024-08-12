package com.medtracker.provider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medtracker.provider.entities.PharmacieSEO;

public interface PharmacyRepository extends JpaRepository<PharmacieSEO, String> {

}
