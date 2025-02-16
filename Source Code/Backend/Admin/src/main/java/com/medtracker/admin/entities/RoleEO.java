package com.medtracker.admin.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import javax.persistence.Column;

@Entity
@Table(name = "ROLES")
public class RoleEO {
	@Id
	@Column(name = "ROLE_NAME")
	private String roleName;

	@Column(name = "ROLE_DESCRIPTION")
	private String roleDescription;

	public RoleEO() {
		super();
	}

	public RoleEO(String roleName, String roleDescription) {
		super();
		this.roleName = roleName;
		this.roleDescription = roleDescription;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getRoleDescription() {
		return roleDescription;
	}

	public void setRoleDescription(String roleDescription) {
		this.roleDescription = roleDescription;
	}

	@Override
	public String toString() {
		return "RoleEO [roleName=" + roleName + ", roleDescription=" + roleDescription + "]";
	}

}