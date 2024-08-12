package com.medtracker.patient.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medtracker.patient.entities.RemainderEO;

public interface ReminderRepository extends JpaRepository<RemainderEO, Integer> {

}
