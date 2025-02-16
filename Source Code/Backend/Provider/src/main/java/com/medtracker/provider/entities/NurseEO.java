package com.medtracker.provider.entities;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import java.sql.Date;
import java.util.Arrays;
import java.util.UUID;

import javax.persistence.Column;

@Entity
@Table(name = "NURSES")
public class NurseEO {

	@Id
	@Column(name = "NURSE_ID", updatable = false)
	private String nurseId;

	@Column(name = "NURSE_NAME")
	private String nurseName;

	@Column(name = "DOB")
	private Date dob;

	@Column(name = "GENDER")
	private String gender;

	@Column(name = "IMAGE")
	private byte[] image;

	@Column(name = "CONTACT_NO")
	private String contactNo;

	@Column(name = "ADDRESS")
	private String address;

	@ManyToOne
	@JoinColumn(name = "HOSPITAL_ID", referencedColumnName = "HOSPITAL_ID")
	private HospitalEO hospitalId;

	@OneToOne
	@JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID")
	private UserEO user;

	public NurseEO() {
		super();
	}

	public NurseEO(String nurseId, String nurseName, Date dob, String gender, byte[] image,
			String contactNo, String address, HospitalEO hospitalId, UserEO user) {
		super();
		this.nurseId = nurseId;
		this.nurseName = nurseName;
		this.dob = dob;
		this.gender = gender;
		this.image = image;
		this.contactNo = contactNo;
		this.address = address;
		this.hospitalId = hospitalId;
		this.user = user;
	}

	public String getNurseId() {
		return nurseId;
	}

	public void setNurseId(String nurseId) {
		this.nurseId = nurseId;
	}

	public String getNurseName() {
		return nurseName;
	}

	public void setNurseName(String nurseName) {
		this.nurseName = nurseName;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public HospitalEO getHospitalId() {
		return hospitalId;
	}

	public void setHospitalId(HospitalEO hospitalId) {
		this.hospitalId = hospitalId;
	}

	public UserEO getUser() {
		return user;
	}

	public void setUser(UserEO user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "NurseEO [nurseId=" + nurseId + ", nurseName=" + nurseName + ", dob=" + dob 
				+ ", gender=" + gender + ", image=" + Arrays.toString(image) + ", contactNo=" + contactNo + ", address="
				+ address + ", hospitalId=" + hospitalId + ", user=" + user + "]";
	}

}