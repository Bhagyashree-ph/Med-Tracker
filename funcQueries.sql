--Find presc_med_details by patient_id
SELECT pmm.*
FROM PRESC_MED_MAPPINGS pmm
INNER JOIN prescription_details pd ON pmm.prescription_id = pd.prescription_id
INNER JOIN patients pdt ON pd.patient_id = pdt.patient_id
WHERE pdt.patient_id = 'RG2707241803';

--Find refill_request by patientId
SELECT rr.*
FROM refill_requests rr
INNER JOIN prescription_details pd ON rr.prescription_id = pd.prescription_id
INNER JOIN patients pdt ON pd.patient_id = pdt.patient_id
WHERE pdt.patient_id = 'P002';

--Find prescription details by patient id
select * from prescription_details
where patient_id='P001';

--Find All mappings based on prescription_id
select * from presc_med_mappings
where prescription_id=1;

--Find patient by user id
select * from patients
where user_id='58DF505';

select * from users where user_id='58DF505';

------ Procedure to check for reminders and add notifications
CREATE OR REPLACE PROCEDURE sp_checkreminders IS
  v_current_time VARCHAR2(15);
  v_remind_time VARCHAR2(15);
  v_notification_id NUMBER;
BEGIN
  SELECT
    to_char(to_timestamp_tz(systimestamp, 'DD-MON-RR HH.MI.SS.FF AM TZR'), 'HH:MI') 
  INTO v_current_time
  FROM
    dual;

  FOR r IN (
    SELECT
      *
    FROM
      reminders
  ) LOOP
    SELECT
          to_char(to_timestamp(to_char(r.remind_on, 'DD-MM-RR HH.MI.SS.FF AM'), 'DD-MM-RR HH.MI.SS.FF AM'),
                  'HH:MI')
                  INTO 
                  v_remind_time
        FROM
          dual;
    DBMS_OUTPUT.PUT_LINE('Remind on time : ' || v_remind_time);
    SELECT notification_id_seq.NEXTVAL INTO v_notification_id FROM DUAL;
    IF (v_remind_time = v_current_time)  THEN
    -- Add a new notification record
    INSERT INTO notifications (
      notification_id,
      notification_type,
      patient_id,
      reminder_id,
      message,
      created_on
    ) VALUES (
      v_notification_id,
      'REMINDER',
      r.patient_id,
      r.reminder_id,
      'It is time to take your medication',
      SYSTIMESTAMP
    );
    END IF;
  END LOOP;
END;


CREATE OR REPLACE PROCEDURE sp_CheckPrescriptionExpiries AS
v_notification_id NUMBER;
v_diff NUMBER;
BEGIN
    FOR p IN (
        SELECT * FROM prescription_details
    ) LOOP 
    SELECT ROUND(TO_DATE(p.end_date, 'DD-MON-RR') - SYSDATE) INTO v_diff FROM DUAL;
    IF (v_diff < 3) AND (v_diff > 0)  THEN 
    SELECT notification_id_seq.NEXTVAL INTO v_notification_id FROM DUAL;
    INSERT INTO notifications (
    notification_id,
    notification_type,
    patient_id,
    prescription_id,
    message,
    created_on
    ) VALUES (
    v_notification_id,
    'Prescription Refill',
    p.patient_id,
    p.prescription_id,
    'Your prescription ' || p.prescription_id || ' is about to expire in ' || to_char(v_diff) || ' days.',
    systimestamp
    );
    END IF;
    END LOOP;
    END;
    
