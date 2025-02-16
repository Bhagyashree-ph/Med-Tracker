package com.medtracker.provider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.medtracker.provider.entities.NurseEO;

public interface NurseRepository extends JpaRepository<NurseEO, String> {

	@Query("SELECT n FROM NurseEO n "
			+ "WHERE n.user.userId = :userId")
	NurseEO findByUserId(@Param(value = "userId") String userId);
}
