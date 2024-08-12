package com.medtracker.admin.service;

import java.util.List;

import com.medtracker.admin.entities.PatientEO;
import com.medtracker.admin.entities.RoleEO;
import com.medtracker.admin.entities.UserEO;

public interface AdminService {

	PatientEO fetchPatientById(String patientID);

	PatientEO addPatient(PatientEO patientEO);

	PatientEO updatePatient(PatientEO patientEO);
	
	List<PatientEO> fetchAllPatients();
	
	void deletePatientById(String patientId);
	
	UserEO UpdateUser(UserEO userEO);
	
	void deleteById(String userId);

	UserEO addUser(UserEO userEO);
	
	RoleEO updateRole(RoleEO roleEO);
	
	void deleteRoleById(String roleName);

	RoleEO addRole(RoleEO roleName);
	
	List<RoleEO> fetchAllRoles();

	UserEO fetchUserById(String userId);
	
}
