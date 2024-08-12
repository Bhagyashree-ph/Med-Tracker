package com.medtracker.patient.entities;

import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import java.sql.Date;
import java.util.UUID;

import javax.persistence.Column;

@Entity
@Table(name = "PATIENTS")
public class PatientEO {

	@Id
	@Column(name = "PATIENT_ID", updatable = false)
	private String patientId;

	@Column(name = "GOVT_ID")
	private String govtId;

	@Column(name = "ID_TYPE")
	private String idType;

	@Column(name = "FIRST_NAME")
	private String firstName;

	@Column(name = "LAST_NAME")
	private String lastName;

	@Column(name = "DOB")
	private Date dob;

	@Column(name = "AGE")
	private Integer age;

	@Column(name = "GENDER")
	private String gender;

	@Column(name = "IMAGE")
	private byte[] image;

	@Column(name = "CONTACT_NO")
	private String contactNo;

	@Column(name = "EMAIL_ID")
	private String emailId;

	@Column(name = "ADDRESS")
	private String address;

	@OneToOne
	@JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID")
	private UserEO user;

	public PatientEO() {
		super();
	}

	public PatientEO(String patientId, String govtId, String idType, String firstName, String lastName, Date dob,
			Integer age, String gender, byte[] image, String contactNo, String emailId, String address, UserEO user) {
		super();
		this.patientId = patientId;
		this.govtId = govtId;
		this.idType = idType;
		this.firstName = firstName;
		this.lastName = lastName;
		this.dob = dob;
		this.age = age;
		this.gender = gender;
		this.image = image;
		this.contactNo = contactNo;
		this.emailId = emailId;
		this.address = address;
		this.user = user;
	}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
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

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
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

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public UserEO getUser() {
		return user;
	}

	public void setUser(UserEO user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "PatientEO [patientId=" + patientId + ", govtId=" + govtId + ", idType=" + idType + ", firstName="
				+ firstName + ", lastName=" + lastName + ", dob=" + dob + ", age=" + age + ", gender=" + gender
				+ ", image=" + image + ", contactNo=" + contactNo + ", emailId=" + emailId + ", address=" + address
				+ ", user=" + user + "]";
	}

}