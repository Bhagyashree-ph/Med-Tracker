package com.medtracker.admin.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medtracker.admin.entities.PatientEO;
import com.medtracker.admin.entities.RoleEO;
import com.medtracker.admin.repositories.PatientRepository;
import com.medtracker.admin.repositories.RoleRepository;
import com.medtracker.admin.repositories.UserRepository;
import com.medtracker.admin.service.AdminService;
import com.medtracker.admin.entities.UserEO;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private PatientRepository patientRepo;

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private RoleRepository roleRepo;

	public String getPatientId(String firstName, String lastName) {
		java.util.Date currentDate = new java.util.Date();
		String day = String.format("%02d", currentDate.getDate());
		String month = String.format("%02d", currentDate.getMonth() + 1);
		String year = String.valueOf(currentDate.getYear() % 100);
		String hour = String.format("%02d", currentDate.getHours());
		String minute = String.format("%02d", currentDate.getMinutes());
		String patientId = firstName.substring(0, 1).toUpperCase() + lastName.substring(0, 1).toUpperCase() + day
				+ month + year + hour + minute;
		return patientId;
	}

	@Override
	public PatientEO fetchPatientById(String patientID) {
		return patientRepo.findById(patientID).get();
	}

	@Override
	public PatientEO addPatient(PatientEO patientEO) {
		String patientId = getPatientId(patientEO.getFirstName(), patientEO.getLastName());
		patientEO.setPatientId(patientId);
		if (patientEO.getUser() != null) {
			UserEO user = userRepo.save(patientEO.getUser());
			if (user != null) {
				patientEO.setUser(user);
				return patientRepo.save(patientEO);
			} else {
				return null;
			}
		} else {
			return null;
		}
	}

	@Override
	public PatientEO updatePatient(PatientEO patientEO) {
		return patientRepo.save(patientEO);
	}

	@Override
	public List<PatientEO> fetchAllPatients() {
		return patientRepo.findAll();
	}

	@Override
	public void deletePatientById(String patientId) {
		patientRepo.deleteById(patientId);
	}

	@Override
	public UserEO UpdateUser(UserEO userEO) {
		return userRepo.save(userEO);
	}

	@Override
	public void deleteById(String userId) {
		userRepo.deleteById(userId);
	}

	@Override
	public UserEO addUser(UserEO userEO) {
		return userRepo.save(userEO);
	}

	@Override
	public RoleEO updateRole(RoleEO roleEO) {
		// TODO Auto-generated method stub
		return roleRepo.save(roleEO);
	}

	@Override
	public void deleteRoleById(String roleName) {
		// TODO Auto-generated method stub
		roleRepo.deleteById(roleName);
	}

	@Override
	public RoleEO addRole(RoleEO roleEO) {
		// TODO Auto-generated method stub
		return roleRepo.save(roleEO);
	}

	@Override
	public List<RoleEO> fetchAllRoles() {
		// TODO Auto-generated method stub
		return roleRepo.findAll();
	}

	@Override
	public UserEO fetchUserById(String userId) {
		// TODO Auto-generated method stub
		return userRepo.findById(userId).get();
	}

}
