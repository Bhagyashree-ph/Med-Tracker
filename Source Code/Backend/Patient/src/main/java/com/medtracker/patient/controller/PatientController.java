package com.medtracker.patient.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medtracker.patient.entities.DoctorEO;
import com.medtracker.patient.entities.HospitalEO;
import com.medtracker.patient.entities.MedicationDetailEO;
import com.medtracker.patient.entities.NotificationEO;
import com.medtracker.patient.entities.PatientEO;
import com.medtracker.patient.entities.PrescMedMappingEO;
import com.medtracker.patient.entities.PrescriptionDetailEO;
import com.medtracker.patient.entities.RefillRequestEO;
import com.medtracker.patient.entities.RemainderEO;
import com.medtracker.patient.entities.UserEO;
import com.medtracker.patient.service.PatientService;

@RestController
@RequestMapping("/patient")
@CrossOrigin(origins = "http://localhost:3001")
public class PatientController {

	@Autowired
	private PatientService patientService;
	
	@GetMapping("/fetchPatientByUserId/{userId}")
	public PatientEO fetchPatientByUserId(@PathVariable String userId) {
		return patientService.fetchPatientByUserId(userId);
	}

	@GetMapping("/fetchPatientById/{patientID}")
	public PatientEO fetchPatientById(@PathVariable String patientID) {
		return patientService.fetchPatientById(patientID);
	}

	@PostMapping("/addPatient")
	public PatientEO addPatient(@RequestBody PatientEO patientEO) {
		return patientService.addPatient(patientEO);
	}

	@PutMapping("/updatePatient")
	public PatientEO updatePatient(@RequestBody PatientEO patientEO) {
		return patientService.updatePatient(patientEO);
	}
	
	@PutMapping("/updateuser")
	public UserEO updateUser(@RequestBody UserEO userEO) {
		return patientService.updateUser(userEO);
	}

	@PostMapping("/AddPreMedDetails")
	public List<PrescMedMappingEO> addPrescriptionAndMedication(@RequestBody List<PrescMedMappingEO> prescMedMappingEO) {
		return patientService.addPrescriptionAndMedication(prescMedMappingEO);
	}

	@PutMapping("/updatePreMedDetails")
	public List<PrescMedMappingEO> updatePrescriptionAndMedication(@RequestBody List<PrescMedMappingEO> prescMedMappingEO) {
		return patientService.updatePrescriptionAndMedication(prescMedMappingEO);
	}

	@PostMapping("/sendRequest")
	public RefillRequestEO sendRequest(@RequestBody RefillRequestEO refillRequestEO) {
		return patientService.sendRequest(refillRequestEO);
	}

	@GetMapping("/fetchAllRequests/{patientId}")
	public List<RefillRequestEO> fetchAllRequests(@PathVariable(name="patientId") String patientId) {
		return patientService.fetchAllRequests(patientId);
	}

	@PostMapping("/setReminders")
	public List<RemainderEO> setRemainder(@RequestBody List<RemainderEO> reminders) {
		for (RemainderEO reminder : reminders) {
			System.out.println(reminder);
		}
		return patientService.setRemainder(reminders);
	}

	@GetMapping("/fetchAllHospitals")
	public List<HospitalEO> fetchAllHospitals() {
		return patientService.fetchAllHospitals();
	}

	@GetMapping("/fetchAllDoctors")
	public List<DoctorEO> fetchAllDoctors() {
		return patientService.fetchAllDoctors();
	}

	@GetMapping("/fetchAllPrescriptions/{patientId}")
	public List<PrescriptionDetailEO> fetchAllPrescriptions(@PathVariable(name="patientId") String patientId) {
		return patientService.fetchAllPrescriptions(patientId);
	}
	

	@GetMapping("/fetchAllMappings/{patientId}")
	public List<PrescMedMappingEO> fetchAllMappings(@PathVariable(name="patientId") String patientId) {
		return patientService.fetchAllMappings(patientId);
	}

	@GetMapping("/fetchPrescMedDetails/{prescriptionId}")
	public List<PrescMedMappingEO> fetchPrescMedDetails(@PathVariable(name="prescriptionId") Integer prescriptionId) {
		return patientService.fetchPrescMedDetails(prescriptionId);
	}
	
	@GetMapping("/fetchAllProviders")
	public List<Map<String, Object>> fetchProviders() {
		return patientService.fetchProviders();
	}
	
	@GetMapping("/fetchAllNotifications/{patientId}")
	public List<NotificationEO> fetchAllNotifications(@PathVariable(name="patientId") String patientId) {
		System.out.println("In service .." + patientId);
		return patientService.fetchAllNotifications(patientId);
	}
	
	@DeleteMapping("/deleteNotification/{notificationId}")
	public void deleteNotification(@PathVariable Long notificationId) {
		patientService.deleteNotification(notificationId);
	}
	
	@PutMapping("/updateMedication")
	public MedicationDetailEO updateMedication(@RequestBody NotificationEO notify) {
		return patientService.updateMedication(notify);
	}
}
