package com.medtracker.provider.entities;

import java.sql.Timestamp;

import javax.persistence.*;

@Entity
@Table(name = "REMINDERS")
public class RemainderEO {

	@Id
	@Column(name = "REMINDER_ID", nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rem_seq")
	@SequenceGenerator(name = "rem_seq", sequenceName = "REMINDER_SEQ", allocationSize = 1)
	private Long reminderId;

	@Column(name = "REMIND_ON")
	private Timestamp remindOn;

	@ManyToOne
	@JoinColumn(name = "MEDICATION_ID", referencedColumnName="MEDICATION_ID")
	private MedicationDetailEO medicationDetail;

	@ManyToOne
	@JoinColumn(name = "PATIENT_ID", referencedColumnName="PATIENT_ID")
	private PatientEO patient;

	public RemainderEO() {
		super();
	}

	public RemainderEO(Long reminderId, Timestamp remindOn, MedicationDetailEO medicationDetail, PatientEO patient) {
		super();
		this.reminderId = reminderId;
		this.remindOn = remindOn;
		this.medicationDetail = medicationDetail;
		this.patient = patient;
	}

	public Long getReminderId() {
		return reminderId;
	}

	public void setReminderId(Long reminderId) {
		this.reminderId = reminderId;
	}

	public Timestamp getRemindOn() {
		return remindOn;
	}

	public void setRemindOn(Timestamp remindOn) {
		this.remindOn = remindOn;
	}

	public MedicationDetailEO getMedicationDetail() {
		return medicationDetail;
	}

	public void setMedicationDetail(MedicationDetailEO medicationDetail) {
		this.medicationDetail = medicationDetail;
	}

	public PatientEO getPatient() {
		return patient;
	}

	public void setPatient(PatientEO patient) {
		this.patient = patient;
	}

	@Override
	public String toString() {
		return "RemainderEO [reminderId=" + reminderId + ", remindOn=" + remindOn + ", medicationDetail="
				+ medicationDetail + ", patient=" + patient + "]";
	}

}
