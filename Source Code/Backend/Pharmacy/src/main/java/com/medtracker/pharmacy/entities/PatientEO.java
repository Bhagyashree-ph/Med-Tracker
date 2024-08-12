package com.medtracker.pharmacy.entities;

import java.io.Serializable;
import java.sql.Date;
import java.util.Arrays;

import javax.persistence.*;

@Entity
@Table(name = "PATIENTS")
public class PatientEO implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "PATIENT_ID", nullable = false, length = 50)
	private String patientId;

	@Column(length = 200)
	private String address;

	private Integer age;

	@Column(name = "CONTACT_NO", length = 20)
	private String contactNo;

	private Date dob;

	@Column(name = "EMAIL_ID", length = 100)
	private String emailId;

	@Column(name = "FIRST_NAME", length = 50)
	private String firstName;

	@Column(length = 10)
	private String gender;

	@Column(name = "GOVT_ID", unique = true, length = 50)
	private String govtId;

	@Column(name = "ID_TYPE", length = 20)
	private String idType;

	@Column(length = 200)
	private byte[] image;

	@Column(name = "LAST_NAME", length = 50)
	private String lastName;

	@ManyToOne
	@JoinColumn(name = "USER_ID", referencedColumnName="USER_ID")
	private UserEO user;

	public PatientEO() {
		super();
	}

	public PatientEO(String patientId, String address, Integer age, String contactNo, Date dob, String emailId,
			String firstName, String gender, String govtId, String idType, byte[] image, String lastName, UserEO user) {
		super();
		this.patientId = patientId;
		this.address = address;
		this.age = age;
		this.contactNo = contactNo;
		this.dob = dob;
		this.emailId = emailId;
		this.firstName = firstName;
		this.gender = gender;
		this.govtId = govtId;
		this.idType = idType;
		this.image = image;
		this.lastName = lastName;
		this.user = user;
	}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getGovtId() {
		return govtId;
	}

	public void setGovtId(String govtId) {
		this.govtId = govtId;
	}

	public String getIdType() {
		return idType;
	}

	public void setIdType(String idType) {
		this.idType = idType;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public UserEO getUser() {
		return user;
	}

	public void setUser(UserEO user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "PatientEO [patientId=" + patientId + ", address=" + address + ", age=" + age + ", contactNo="
				+ contactNo + ", dob=" + dob + ", emailId=" + emailId + ", firstName=" + firstName + ", gender="
				+ gender + ", govtId=" + govtId + ", idType=" + idType + ", image=" + Arrays.toString(image)
				+ ", lastName=" + lastName + ", user=" + user + "]";
	}

}
