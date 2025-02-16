package com.medtracker.provider.service.impl;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.medtracker.provider.entities.*;
import com.medtracker.provider.repositories.*;
import com.medtracker.provider.service.ProviderService;

@Service
public class ProviderServiceImpl implements ProviderService {

	@Autowired
	private PatientRepository patientRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private PrescMedMappingRepository prescMedRepo;

	@Autowired
	private PrescriptionRepository prescRepo;

	@Autowired
	private MedicationRepository medRepo;

	@Autowired
	private HospitalRepository hospitalRepo;

	@Autowired
	private DoctorRepository drRepo;

	@Autowired
	private PharmacyRepository pharmRepo;

	@Autowired
	private RefillRequestRepository refillRepo;

	@Autowired
	private ReminderRepository remRepo;
	
	@Autowired
	private NurseRepository nurseRepo;

	@Autowired
	private PlatformTransactionManager transactionManager;

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

	public PatientEO addPatient(PatientEO patientEO) {
		String patientId = getPatientId(patientEO.getFirstName(), patientEO.getLastName());
		patientEO.setPatientId(patientId);
		if (patientEO.getUser() != null) {
			UserEO user = userRepo.save(patientEO.getUser());
			if (user != null) {
				patientEO.setUser(user);
				return patientRepo.save(patientEO);
			} else {
				System.out.println("User is null");
				return null;
			}
		} else {
			System.out.println("Patient is null");
			return null;
		}
	}

	public byte[] convertImageToByteArray(String image) throws Exception {
		BufferedImage bImage = ImageIO.read(new File(image));
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		ImageIO.write(bImage, "jpg", bos);
		return bos.toByteArray();
	}

	@Override
	public List<PatientEO> fetchAllPatients() {
		List<PatientEO> patients = patientRepo.findAll();
		System.out.println("Service : " + patients);
		return patients;
	}

	@Override
	public List<PrescMedMappingEO> fetchPatientDetailsById(String patientID) {
		List<PrescMedMappingEO> prescMed = prescMedRepo.findByPatientId(patientID);
		for (PrescMedMappingEO prescMedMappingEO : prescMed) {
			System.out.println("Patient in Service : " + prescMedMappingEO);
		}
		return prescMed;
	}

	/**
	 * Adds a new prescription and medication for a patient.
	 * 
	 * This method takes a list of PrescMedMappingEO objects as input, which represents the prescription and medication details.
	 * It first saves the patient details, then saves the prescription details, and finally saves the medication details.
	 * The method returns a list of PrescMedMappingEO objects, which represents the saved prescription and medication details.
	 * 
	 * @param preMeds a list of PrescMedMappingEO objects, which represents the prescription and medication details
	 * @return a list of PrescMedMappingEO objects, which represents the saved prescription and medication details
	 */
	@Override
	public List<PrescMedMappingEO> addPrescriptionAndMedication(List<PrescMedMappingEO> preMeds) {
		for (PrescMedMappingEO prescMedMappingEO : preMeds) {
			System.out.println("Pre meds in Service : " + prescMedMappingEO);
		}

		// TransactionDefinition transactionDefinition = new
		// DefaultTransactionDefinition();
		// TransactionStatus status =
		// transactionManager.getTransaction(transactionDefinition);

		List<PrescMedMappingEO> returnedPreMeds = new ArrayList<>();
		PrescriptionDetailEO presc = null;
		if (preMeds.size() > 0 && preMeds.get(0).getPrescriptionDetails() != null) {
			PrescriptionDetailEO prescDetails = preMeds.get(0).getPrescriptionDetails();
			if (prescDetails.getPatient() != null) {
				PatientEO patient = addPatient(prescDetails.getPatient());
				prescDetails.setPatient(patient);
				presc = prescRepo.save(prescDetails);
			}

			int count = 1;
			for (PrescMedMappingEO prescMedMappingEO : preMeds) {
				System.out.println("For iteration " + count + " : " + prescMedMappingEO);
				try {
					System.out.println("For iteration " + count + " : " + presc);
					count++;
					prescMedMappingEO.setPrescriptionDetails(presc);
					if (prescMedMappingEO.getMedicationDetails() != null) {
						MedicationDetailEO med = medRepo.save(prescMedMappingEO.getMedicationDetails());
						prescMedMappingEO.setMedicationDetails(med);
						PrescMedMappingEO preMed = prescMedRepo.save(prescMedMappingEO);
						System.out.println("Printing preMed : " + preMed);

						if (preMed != null) {
							returnedPreMeds.add(preMed);
							// transactionManager.commit(status);
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
					// transactionManager.rollback(status);
				}
			}
		}
		return returnedPreMeds;
	}

	@Override
	public List<PrescMedMappingEO> updatePrescriptionAndMedication(List<PrescMedMappingEO> preMeds) {
		for (PrescMedMappingEO prescMedMappingEO : preMeds) {
			System.out.println("Pre meds in Service : " + prescMedMappingEO);
		}

		// TransactionDefinition transactionDefinition = new
		// DefaultTransactionDefinition();
		// TransactionStatus status =
		// transactionManager.getTransaction(transactionDefinition);

		List<PrescMedMappingEO> returnedPreMeds = new ArrayList<>();
		PrescriptionDetailEO presc = null;
		if (preMeds.size() > 0 && preMeds.get(0).getPrescriptionDetails() != null) {
			PrescriptionDetailEO prescDetails = preMeds.get(0).getPrescriptionDetails();
			if (prescDetails.getPatient() != null) {
				PatientEO patient = addPatient(prescDetails.getPatient());
				prescDetails.setPatient(patient);
				presc = prescRepo.save(prescDetails);
			}

			int count = 1;
			for (PrescMedMappingEO prescMedMappingEO : preMeds) {
				System.out.println("For iteration " + count + " : " + prescMedMappingEO);
				try {
					System.out.println("For iteration " + count + " : " + presc);
					count++;
					prescMedMappingEO.setPrescriptionDetails(presc);
					if (prescMedMappingEO.getMedicationDetails() != null) {
						MedicationDetailEO med = medRepo.save(prescMedMappingEO.getMedicationDetails());
						prescMedMappingEO.setMedicationDetails(med);
						PrescMedMappingEO preMed = prescMedRepo.save(prescMedMappingEO);
						System.out.println("Printing preMed : " + preMed);

						if (preMed != null) {
							returnedPreMeds.add(preMed);
							// transactionManager.commit(status);
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
					// transactionManager.rollback(status);
				}
			}
		}
		return returnedPreMeds;
	}

	@Override
	public RefillRequestEO updateRequest(RefillRequestEO refillRequestEO) {
		return refillRepo.save(refillRequestEO);
	}

	@Override
	public List<RefillRequestEO> fetchAllRequests() {
		return refillRepo.findByRequestType("Prescription");
	}

	@Override
	public List<RemainderEO> setRemainder(List<RemainderEO> reminders) {
		List<RemainderEO> returnedRems = new ArrayList<>();
		for (RemainderEO remainderEO : reminders) {
			RemainderEO rem = remRepo.save(remainderEO);
			if (rem != null) {
				returnedRems.add(rem);
			}
		}
		return returnedRems;
	}

	@Override
	public List<HospitalEO> fetchAllHospitals() {
		return hospitalRepo.findAll();
	}

	@Override
	public List<DoctorEO> fetchAllDoctors() {
		return drRepo.findAll();
	}

	@Override
	public NurseEO fetchProviderByUserId(String userId) {
		return nurseRepo.findByUserId(userId);
	}

}
