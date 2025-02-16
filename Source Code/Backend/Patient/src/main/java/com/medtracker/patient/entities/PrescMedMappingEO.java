package com.medtracker.patient.entities;

import javax.persistence.*;

@Entity
@Table(name = "PRESC_MED_MAPPINGS")
public class PrescMedMappingEO {

    @Id
    @Column(name="MAPPING_ID", nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "presc_med_mapping_seq")
    @SequenceGenerator(name = "presc_med_mapping_seq", sequenceName = "PRE_MED_MAPPING_SEQ", allocationSize = 1)
    private Integer mappingId;
    
    @ManyToOne
    @JoinColumn(name = "MEDICATION_ID")
    private MedicationDetailEO medicationDetails;
    
    @ManyToOne
    @JoinColumn(name = "PRESCRIPTION_ID")
    private PrescriptionDetailEO prescriptionDetails;

	public PrescMedMappingEO() {
		super();
	}

	public PrescMedMappingEO(Integer mappingId, MedicationDetailEO medicationDetails,
			PrescriptionDetailEO prescriptionDetails) {
		super();
		this.mappingId = mappingId;
		this.medicationDetails = medicationDetails;
		this.prescriptionDetails = prescriptionDetails;
	}

	public Integer getMappingId() {
		return mappingId;
	}

	public void setMappingId(Integer mappingId) {
		this.mappingId = mappingId;
	}

	public MedicationDetailEO getMedicationDetails() {
		return medicationDetails;
	}

	public void setMedicationDetails(MedicationDetailEO medicationDetails) {
		this.medicationDetails = medicationDetails;
	}

	public PrescriptionDetailEO getPrescriptionDetails() {
		return prescriptionDetails;
	}

	public void setPrescriptionDetails(PrescriptionDetailEO prescriptionDetails) {
		this.prescriptionDetails = prescriptionDetails;
	}

	@Override
	public String toString() {
		return "PrescMedMappingEO [mappingId=" + mappingId + ", medicationDetails=" + medicationDetails
				+ ", prescriptionDetails=" + prescriptionDetails + "]";
	}
    
}
