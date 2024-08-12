package com.medtracker.patient.entities;

import java.io.Serializable;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "REFILL_REQUESTS")
public class RefillRequestEO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "custom-generator")
	@GenericGenerator(name = "custom-generator", strategy = "com.medtracker.patient.util.CustomGenerator")
	@Column(name = "REFILL_REQUEST_ID", nullable = false, length = 50)
	private String refillRequestId;

	@Column(length = 200)
	private String comments;

	@Column(name = "FULFILLED_ON")
	private Timestamp fulfilledOn;

	@Column(name = "REFILL_QUANTITY")
	private Integer refillQuantity;

	@Column(name = "REQUESTED_ON")
	private Timestamp requestedOn;

	@Column(name = "REQUEST_TYPE", length = 20)
	private String requestType;

	@Column(name = "FULFILLED_QUANTITY")
	private Integer fulfilledQuantity;

	@ManyToOne
	@JoinColumn(name = "MEDICATION_ID", referencedColumnName = "MEDICATION_ID")
	private MedicationDetailEO medicationDetails;

	@ManyToOne
	@JoinColumn(name = "STATUS", referencedColumnName = "STATUS_CODE")
	private StatusEO status;

	@ManyToOne
	@JoinColumn(name = "PRESCRIPTION_ID", referencedColumnName = "PRESCRIPTION_ID")
	private PrescriptionDetailEO prescriptionDetails;

	@ManyToOne
	@JoinColumn(name = "FULFILLED_BY", referencedColumnName = "USER_ID")
	private UserEO user;

	@ManyToOne
	@JoinColumn(name = "REQUESTED_BY", referencedColumnName = "PATIENT_ID")
	private PatientEO patient;

	public RefillRequestEO() {
	}

	public RefillRequestEO(String refillRequestId, String comments, Timestamp fulfilledOn, Integer refillQuantity,
			Timestamp requestedOn, String requestType, Integer fulfilledQuantity, MedicationDetailEO medicationDetails,
			StatusEO status, PrescriptionDetailEO prescriptionDetails, UserEO user, PatientEO patient) {
		super();
		this.refillRequestId = refillRequestId;
		this.comments = comments;
		this.fulfilledOn = fulfilledOn;
		this.refillQuantity = refillQuantity;
		this.requestedOn = requestedOn;
		this.requestType = requestType;
		this.fulfilledQuantity = fulfilledQuantity;
		this.medicationDetails = medicationDetails;
		this.status = status;
		this.prescriptionDetails = prescriptionDetails;
		this.user = user;
		this.patient = patient;
	}

	public String getRefillRequestId() {
		return refillRequestId;
	}

	public void setRefillRequestId(String refillRequestId) {
		this.refillRequestId = refillRequestId;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Timestamp getFulfilledOn() {
		return fulfilledOn;
	}

	public void setFulfilledOn(Timestamp fulfilledOn) {
		this.fulfilledOn = fulfilledOn;
	}

	public Integer getRefillQuantity() {
		return refillQuantity;
	}

	public void setRefillQuantity(Integer refillQuantity) {
		this.refillQuantity = refillQuantity;
	}

	public Timestamp getRequestedOn() {
		return requestedOn;
	}

	public void setRequestedOn(Timestamp requestedOn) {
		this.requestedOn = requestedOn;
	}

	public String getRequestType() {
		return requestType;
	}

	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}

	public Integer getFulfilledQuantity() {
		return fulfilledQuantity;
	}

	public void setFulfilledQuantity(Integer fulfilledQuantity) {
		this.fulfilledQuantity = fulfilledQuantity;
	}

	public MedicationDetailEO getMedicationDetails() {
		return medicationDetails;
	}

	public void setMedicationDetails(MedicationDetailEO medicationDetails) {
		this.medicationDetails = medicationDetails;
	}

	public StatusEO getStatus() {
		return status;
	}

	public void setStatus(StatusEO status) {
		this.status = status;
	}

	public PrescriptionDetailEO getPrescriptionDetails() {
		return prescriptionDetails;
	}

	public void setPrescriptionDetails(PrescriptionDetailEO prescriptionDetails) {
		this.prescriptionDetails = prescriptionDetails;
	}

	public UserEO getUser() {
		return user;
	}

	public void setUser(UserEO user) {
		this.user = user;
	}

	public PatientEO getPatient() {
		return patient;
	}

	public void setPatient(PatientEO patient) {
		this.patient = patient;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "RefillRequestEO [refillRequestId=" + refillRequestId + ", comments=" + comments + ", fulfilledOn="
				+ fulfilledOn + ", refillQuantity=" + refillQuantity + ", requestedOn=" + requestedOn + ", requestType="
				+ requestType + ", fulfilledQuantity=" + fulfilledQuantity + ", medicationDetails=" + medicationDetails
				+ ", status=" + status + ", prescriptionDetails=" + prescriptionDetails + ", user=" + user
				+ ", patient=" + patient + "]";
	}

}
