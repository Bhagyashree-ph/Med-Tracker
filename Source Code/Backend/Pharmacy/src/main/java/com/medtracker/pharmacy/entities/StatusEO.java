package com.medtracker.pharmacy.entities;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "STATUS")
public class StatusEO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "STATUS_CODE", nullable = false, length = 20)
	private String statusCode;

	@Column(name = "STATUS_LABEL", length = 20)
	private String statusLabel;

	public StatusEO() {
		super();
	}

	public StatusEO(String statusCode, String statusLabel) {
		super();
		this.statusCode = statusCode;
		this.statusLabel = statusLabel;
	}

	public String getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}

	public String getStatusLabel() {
		return statusLabel;
	}

	public void setStatusLabel(String statusLabel) {
		this.statusLabel = statusLabel;
	}

	@Override
	public String toString() {
		return "StatusEO [statusCode=" + statusCode + ", statusLabel=" + statusLabel + "]";
	}

}
