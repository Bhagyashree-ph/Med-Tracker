package com.medtracker.patient.repositories;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class HospitalPharmacyRepository {
	
  @Autowired
  private JdbcTemplate jdbcTemplate;

  public List<Map<String, Object>> findAllHospitalsAndPharmacies() {
    String sql = "SELECT 'hospital' AS type, h.hospital_id AS hospitalId, h.hospital_name AS hospitalName, h.address, h.contact_no AS contactNo "
        + "FROM hospitals h "
        + "UNION ALL "
        + "SELECT 'pharmacy' AS type, p.pharmacy_id AS pharmacyId, p.pharmacy_name AS pharmacyName, p.address, p.contact_no AS contactNo "
        + "FROM pharmacies p";
    return jdbcTemplate.queryForList(sql);
  }
}
