package com.medtracker.pharmacy.entities;

import java.io.Serializable;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import com.medtracker.pharmacy.entities.RoleEO;

@Entity
@Table(name = "USERS")
public class UserEO implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "custom-generator")
	@GenericGenerator(name = "custom-generator", strategy = "com.medtracker.pharmacy.util.CustomGenerator")
	@Column(name = "USER_ID")
	private String userId;

	@Column(name = "PASSWORD")
	private String password;

	@ManyToOne
	@JoinColumn(name = "ROLE_NAME", referencedColumnName = "ROLE_NAME")
	private RoleEO role;

	public UserEO() {
		super();
	}

	public UserEO(String userId, String password, RoleEO role) {
		super();
		this.userId = userId;
		this.password = password;
		this.role = role;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public RoleEO getRole() {
		return role;
	}

	public void setRole(RoleEO role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "UserEO [userId=" + userId + ", password=" + password + ", role=" + role + "]";
	}

}
