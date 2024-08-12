package com.medtracker.pharmacy.entities;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "ROLES")
public class RoleEO  implements Serializable {
	
    private static final long serialVersionUID = 1L;
   
    @Id
    @Column(name="ROLE_NAME", nullable = false, length = 50)
    private String roleName;
    
    @Column(name="ROLE_DESCRIPTION", length = 200)
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
