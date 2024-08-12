package com.medtracker.patient.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.medtracker.patient.entities.NotificationEO;

public interface NotificationsRepository extends JpaRepository<NotificationEO, Long> {
	
	@Query("SELECT n FROM NotificationEO n WHERE n.patient.patientId = :patientId")
	List<NotificationEO> findAllByPatientId(@Param(value="patientId") String patientId);

}
