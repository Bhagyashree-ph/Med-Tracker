package com.medtracker.patient.entities;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "DOCTORS")
public class DoctorEO implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "DOCTOR_ID", nullable = false, length = 50)
	private String doctorId;

	@Column(name = "DOCTOR_NAME", length = 50)
	private String doctorName;

	@Column(length = 100)
	private String specialization;

	@ManyToOne
	@JoinColumn(name = "HOSPITAL_ID", referencedColumnName="HOSPITAL_ID")
	private HospitalEO hospital;

	public DoctorEO() {
		super();
	}

	public DoctorEO(String doctorId, String doctorName, String specialization, HospitalEO hospital) {
		super();
		this.doctorId = doctorId;
		this.doctorName = doctorName;
		this.specialization = specialization;
		this.hospital = hospital;
	}

	public String getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(String doctorId) {
		this.doctorId = doctorId;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getSpecialization() {
		return specialization;
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

	public HospitalEO getHospital() {
		return hospital;
	}

	public void setHospital(HospitalEO hospital) {
		this.hospital = hospital;
	}

	@Override
	public String toString() {
		return "DoctorEO [doctorId=" + doctorId + ", doctorName=" + doctorName + ", specialization=" + specialization
				+ ", hospital=" + hospital + "]";
	}

}
