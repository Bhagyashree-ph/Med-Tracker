package com.medtracker.pharmacy.entities;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "HOSPITALS")
public class HospitalEO implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(length = 200)
	private String address;

	@Column(name = "CONTACT_NO", length = 20)
	private String contactNo;

	@Id
	@Column(name = "HOSPITAL_ID", nullable = false, length = 50)
	private String hospitalId;

	@Column(name = "HOSPITAL_NAME", length = 100)
	private String hospitalName;

	public HospitalEO() {
		super();
	}

	public HospitalEO(String address, String contactNo, String hospitalId, String hospitalName) {
		super();
		this.address = address;
		this.contactNo = contactNo;
		this.hospitalId = hospitalId;
		this.hospitalName = hospitalName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public String getHospitalId() {
		return hospitalId;
	}

	public void setHospitalId(String hospitalId) {
		this.hospitalId = hospitalId;
	}

	public String getHospitalName() {
		return hospitalName;
	}

	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}

	@Override
	public String toString() {
		return "HospitalEO [address=" + address + ", contactNo=" + contactNo + ", hospitalId=" + hospitalId
				+ ", hospitalName=" + hospitalName + "]";
	}

}
