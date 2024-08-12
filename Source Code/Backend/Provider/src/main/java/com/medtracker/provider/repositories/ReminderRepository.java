package com.medtracker.provider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medtracker.provider.entities.RemainderEO;

public interface ReminderRepository extends JpaRepository<RemainderEO, Integer> {

}
