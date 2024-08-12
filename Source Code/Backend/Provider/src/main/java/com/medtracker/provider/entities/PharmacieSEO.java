package com.medtracker.provider.entities;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "PHARMACIES")
public class PharmacieSEO implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(length = 200)
	private String address;

	@Column(name = "CONTACT_NO", length = 20)
	private String contactNo;

	@Id
	@Column(name = "PHARMACY_ID", nullable = false, length = 50)
	private String pharmacyId;

	@Column(name = "PHARMACY_NAME", length = 100)
	private String pharmacyName;

	@ManyToOne
	@JoinColumn(name = "USER_ID", referencedColumnName="USER_ID")
	private UserEO users;

	public PharmacieSEO() {
		super();
	}

	public PharmacieSEO(String address, String contactNo, String pharmacyId, String pharmacyName, UserEO users) {
		super();
		this.address = address;
		this.contactNo = contactNo;
		this.pharmacyId = pharmacyId;
		this.pharmacyName = pharmacyName;
		this.users = users;
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

	public String getPharmacyId() {
		return pharmacyId;
	}

	public void setPharmacyId(String pharmacyId) {
		this.pharmacyId = pharmacyId;
	}

	public String getPharmacyName() {
		return pharmacyName;
	}

	public void setPharmacyName(String pharmacyName) {
		this.pharmacyName = pharmacyName;
	}

	public UserEO getUsers() {
		return users;
	}

	public void setUsers(UserEO users) {
		this.users = users;
	}

	@Override
	public String toString() {
		return "PharmacieSEO [address=" + address + ", contactNo=" + contactNo + ", pharmacyId=" + pharmacyId
				+ ", pharmacyName=" + pharmacyName + ", users=" + users + "]";
	}

}
