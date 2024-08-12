package com.medtracker.provider.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medtracker.provider.entities.DoctorEO;
import com.medtracker.provider.entities.HospitalEO;
import com.medtracker.provider.entities.NurseEO;
import com.medtracker.provider.entities.PatientEO;
import com.medtracker.provider.entities.PrescMedMappingEO;
import com.medtracker.provider.entities.RefillRequestEO;
import com.medtracker.provider.entities.RemainderEO;
import com.medtracker.provider.entities.UserEO;
import com.medtracker.provider.service.ProviderService;

@RestController
@RequestMapping("/provider")
@CrossOrigin(origins = "http://localhost:3003")
public class ProviderController {

	@Autowired
	private ProviderService providerService;
	
	@GetMapping("/fetchProvider/{userId}")
	public NurseEO fetchProviderByUserId(@PathVariable(name="userId") String userId) {
		return providerService.fetchProviderByUserId(userId);
	}
	
	@GetMapping("/fetchAllPatients")
	public List<PatientEO> fetchAllPatients() {	
		List<PatientEO> patients = providerService.fetchAllPatients();
		System.out.println("Controller : "+patients);
		return patients;
	}

	@GetMapping("/fetchPatientById/{patientID}")
	public List<PrescMedMappingEO> fetchPatientById(@PathVariable String patientID) {
		List<PrescMedMappingEO> prescMed = providerService.fetchPatientDetailsById(patientID);
		for (PrescMedMappingEO prescMedMappingEO : prescMed) {
			System.out.println("Patient in Controller : " + prescMedMappingEO);
		}
		return prescMed;
	}
	
	@PostMapping("/addPatientDetails")
	public List<PrescMedMappingEO> addPrescriptionAndMedication(@RequestBody List<PrescMedMappingEO> preMeds) {
		List<PrescMedMappingEO> prescMed = providerService.addPrescriptionAndMedication(preMeds);
		for (PrescMedMappingEO prescMedMappingEO : prescMed) {
			System.out.println("Premeds in Controller : " + prescMedMappingEO);
		}
		return prescMed;
	}

	@PutMapping("/updatePatientDetails")
	public List<PrescMedMappingEO> updatePrescriptionAndMedication(List<PrescMedMappingEO> preMeds) {
		return providerService.updatePrescriptionAndMedication(preMeds);
	}

	@PutMapping("/updateRequest")
	public RefillRequestEO updateRequest(@RequestBody RefillRequestEO refillRequestEO) {
		return providerService.updateRequest(refillRequestEO);
	}
	
	@GetMapping("/fetchAllRequests")
	public List<RefillRequestEO> fetchAllRequests() {
//		System.out.println(providerService.fetchAllRequests());
		return providerService.fetchAllRequests();
	}
	
	@PostMapping("/setReminders")
	public List<RemainderEO> setRemainder(@RequestBody List<RemainderEO> reminders) {
		for (RemainderEO reminder : reminders) {
			System.out.println(reminder);
		}
		return providerService.setRemainder(reminders);
	}
	
	@GetMapping("/fetchAllHospitals")
	public List<HospitalEO> fetchAllHospitals() {
		return providerService.fetchAllHospitals();
	}
	
	@GetMapping("/fetchAllDoctors")
	public List<DoctorEO> fetchAllDoctors() {
		return providerService.fetchAllDoctors();
	}

}
