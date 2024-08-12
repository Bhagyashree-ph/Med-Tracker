package com.medtracker.patient.entities;

import java.sql.Timestamp;

import javax.persistence.*;

@Entity
@Table(name = "NOTIFICATIONS")
public class NotificationEO {

	@Id
	@Column(name = "NOTIFICATION_ID")
	private Long notificationId;

	@Column(name = "NOTIFICATION_TYPE")
	private String notificationType;

	@ManyToOne
	@JoinColumn(name = "PATIENT_ID", referencedColumnName = "PATIENT_ID")
	private PatientEO patient;

	@OneToOne
	@JoinColumn(name = "PRESCRIPTION_ID", referencedColumnName = "PRESCRIPTION_ID")
	private PrescriptionDetailEO prescription;

	@OneToOne
	@JoinColumn(name = "MEDICATION_ID", referencedColumnName = "MEDICATION_ID")
	private MedicationDetailEO medication;

	@OneToOne
	@JoinColumn(name = "REMINDER_ID", referencedColumnName = "REMINDER_ID")
	private RemainderEO reminder;

	@Column(name = "MESSAGE")
	private String message;

	@Column(name = "CREATED_ON")
	private Timestamp createdOn;

	public NotificationEO() {
		super();
	}

	public NotificationEO(Long notificationId, String notificationType, PatientEO patient,
			PrescriptionDetailEO prescription, MedicationDetailEO medication, RemainderEO reminder, String message,
			Timestamp createdOn) {
		super();
		this.notificationId = notificationId;
		this.notificationType = notificationType;
		this.patient = patient;
		this.prescription = prescription;
		this.medication = medication;
		this.reminder = reminder;
		this.message = message;
		this.createdOn = createdOn;
	}

	public Long getNotificationId() {
		return notificationId;
	}

	public void setNotificationId(Long notificationId) {
		this.notificationId = notificationId;
	}

	public String getNotificationType() {
		return notificationType;
	}

	public void setNotificationType(String notificationType) {
		this.notificationType = notificationType;
	}

	public PatientEO getPatient() {
		return patient;
	}

	public void setPatient(PatientEO patient) {
		this.patient = patient;
	}

	public PrescriptionDetailEO getPrescription() {
		return prescription;
	}

	public void setPrescription(PrescriptionDetailEO prescription) {
		this.prescription = prescription;
	}

	public MedicationDetailEO getMedication() {
		return medication;
	}

	public void setMedication(MedicationDetailEO medication) {
		this.medication = medication;
	}

	public RemainderEO getReminder() {
		return reminder;
	}

	public void setReminder(RemainderEO reminder) {
		this.reminder = reminder;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Timestamp getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Timestamp createdOn) {
		this.createdOn = createdOn;
	}

	@Override
	public String toString() {
		return "NotificationEO [notificationId=" + notificationId + ", notificationType=" + notificationType
				+ ", patient=" + patient + ", prescription=" + prescription + ", medication=" + medication
				+ ", reminder=" + reminder + ", message=" + message + ", createdOn=" + createdOn + "]";
	}

}
