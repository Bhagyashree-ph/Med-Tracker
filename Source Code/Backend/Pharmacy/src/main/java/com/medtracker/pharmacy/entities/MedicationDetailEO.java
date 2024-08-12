package com.medtracker.pharmacy.entities;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "MEDICATION_DETAILS")
public class MedicationDetailEO implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "MEDICATION_ID", nullable = false)
	private Integer medicationId;

	@Column(name = "MEDICATION_NAME", length = 100)
	private String medicationName;

	private Integer quantity;

	@Column(name = "REFILL_THRESHOLD")
	private Integer refillThreshold;

	@ManyToOne
	@JoinColumn(name = "PHARMACY_ID", referencedColumnName = "PHARMACY_ID")
	private PharmacieSEO pharmacies;

	public MedicationDetailEO() {
		super();
	}

	public MedicationDetailEO(Integer medicationId, String medicationName, Integer quantity, Integer refillThreshold,
			PharmacieSEO pharmacies) {
		super();
		this.medicationId = medicationId;
		this.medicationName = medicationName;
		this.quantity = quantity;
		this.refillThreshold = refillThreshold;
		this.pharmacies = pharmacies;
	}

	public Integer getMedicationId() {
		return medicationId;
	}

	public void setMedicationId(Integer medicationId) {
		this.medicationId = medicationId;
	}

	public String getMedicationName() {
		return medicationName;
	}

	public void setMedicationName(String medicationName) {
		this.medicationName = medicationName;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Integer getRefillThreshold() {
		return refillThreshold;
	}

	public void setRefillThreshold(Integer refillThreshold) {
		this.refillThreshold = refillThreshold;
	}

	public PharmacieSEO getPharmacies() {
		return pharmacies;
	}

	public void setPharmacies(PharmacieSEO pharmacies) {
		this.pharmacies = pharmacies;
	}

	@Override
	public String toString() {
		return "MedicationDetailEO [medicationId=" + medicationId + ", medicationName=" + medicationName + ", quantity="
				+ quantity + ", refillThreshold=" + refillThreshold + "]";
	}

}
