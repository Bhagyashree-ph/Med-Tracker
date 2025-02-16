package com.medtracker.provider.service;

import java.util.List;

import com.medtracker.provider.entities.RefillRequestEO;
import com.medtracker.provider.entities.RemainderEO;
import com.medtracker.provider.entities.DoctorEO;
import com.medtracker.provider.entities.HospitalEO;
import com.medtracker.provider.entities.NurseEO;
import com.medtracker.provider.entities.PatientEO;
import com.medtracker.provider.entities.PrescMedMappingEO;

public interface ProviderService {
	
	NurseEO fetchProviderByUserId(String userId);

	List<PatientEO> fetchAllPatients();

	List<PrescMedMappingEO> fetchPatientDetailsById(String patientID);

	List<PrescMedMappingEO> addPrescriptionAndMedication(List<PrescMedMappingEO> preMeds);

	List<PrescMedMappingEO> updatePrescriptionAndMedication(List<PrescMedMappingEO> preMeds);

	RefillRequestEO updateRequest(RefillRequestEO refillRequestEO);
	
	List<RefillRequestEO> fetchAllRequests();
	
	List<RemainderEO> setRemainder(List<RemainderEO> reminders);
	
	List<HospitalEO> fetchAllHospitals();
	
	List<DoctorEO> fetchAllDoctors();
}
