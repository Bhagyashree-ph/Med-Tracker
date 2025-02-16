package com.medtracker.provider.entities;

import java.io.Serializable;

import java.sql.Date;
import java.util.Arrays;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "PRESCRIPTION_DETAILS")
public class PrescriptionDetailEO implements Serializable {

	/**
	 * 
	 */
	private static final Long serialVersionUID = 1L;

	@Id
	@Column(name = "PRESCRIPTION_ID", nullable = false)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "presc_seq")
    @SequenceGenerator(name = "presc_seq", sequenceName = "PRESCRIPTION_SEQ", allocationSize = 1)
	private Integer prescriptionId;
	
	@Column(length = 200)
	private String ailment;

	@Column(name = "END_DATE")
	private Date endDate;

	@Column(name = "PRESCRIPTION")
	private byte[] prescription;

	@Column(name = "START_DATE")
	private Date startDate;

	@ManyToOne
	@JoinColumn(name = "STATUS", referencedColumnName="STATUS_CODE")
	private StatusEO status;

	@ManyToOne
	@JoinColumn(name = "PATIENT_ID", referencedColumnName="PATIENT_ID")
	private PatientEO patient;

	@ManyToOne
	@JoinColumn(name = "PRESCRIBED_AT", referencedColumnName="HOSPITAL_ID")
	private HospitalEO prescribedAt;

	@ManyToOne
	@JoinColumn(name = "PRESCRIBED_BY", referencedColumnName="DOCTOR_ID")
	private DoctorEO prescribedBy;

	public PrescriptionDetailEO() {
		super();
	}

	public PrescriptionDetailEO(String ailment, Date endDate, byte[] prescription, Integer prescriptionId,
			Date startDate, StatusEO status, PatientEO patient, HospitalEO prescribedAt, DoctorEO prescribedBy) {
		super();
		this.ailment = ailment;
		this.endDate = endDate;
		this.prescription = prescription;
		this.prescriptionId = prescriptionId;
		this.startDate = startDate;
		this.status = status;
		this.patient = patient;
		this.prescribedAt = prescribedAt;
		this.prescribedBy = prescribedBy;
	}

	public String getAilment() {
		return ailment;
	}

	public void setAilment(String ailment) {
		this.ailment = ailment;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public byte[] getPrescription() {
		return prescription;
	}

	public void setPrescription(byte[] prescription) {
		this.prescription = prescription;
	}

	public Integer getPrescriptionId() {
		return prescriptionId;
	}

	public void setPrescriptionId(Integer prescriptionId) {
		this.prescriptionId = prescriptionId;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public StatusEO getStatus() {
		return status;
	}

	public void setStatus(StatusEO status) {
		this.status = status;
	}

	public PatientEO getPatient() {
		return patient;
	}

	public void setPatient(PatientEO patient) {
		this.patient = patient;
	}

	public HospitalEO getHospital() {
		return prescribedAt;
	}

	public void setHospital(HospitalEO prescribedAt) {
		this.prescribedAt = prescribedAt;
	}

	public DoctorEO getDoctor() {
		return prescribedBy;
	}

	public void setDoctor(DoctorEO prescribedBy) {
		this.prescribedBy = prescribedBy;
	}

	@Override
	public String toString() {
		return "PrescriptionDetailEO [ailment=" + ailment + ", endDate=" + endDate + ", prescription="
				+ Arrays.toString(prescription) + ", prescriptionId=" + prescriptionId + ", startDate=" + startDate
				+ ", status=" + status + ", patient=" + patient + ", prescribedAt=" + prescribedAt + ", prescribedBy=" + prescribedBy + "]";
	}

}
