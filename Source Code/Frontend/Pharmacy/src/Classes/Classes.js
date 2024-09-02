export class Role {
    constructor(roleName, roleDescription) {
        this.roleName = roleName;
        this.roleDescription = roleDescription;
    }
}

export class User {
    constructor(userId, password, roleName) {
        this.userId = userId;
        this.password = password;
        this.roleName = roleName;
    }
}

export class Patient {
    constructor(patientId, govtId, idType, firstName, lastName, dob, age, gender, image, contactNo, emailId, address, user) {
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
}

export class Hospital {
    constructor(hospitalId, hospitalName, address, contactNo) {
        this.hospitalId = hospitalId;
        this.hospitalName = hospitalName;
        this.address = address;
        this.contactNo = contactNo;
    }
}

export class Nurse {
    constructor(nurseId, nurseName, dob, gender, image, contactNo, address, hospitalId, userId) {
        this.nurseId = nurseId;
        this.nurseName = nurseName;
        this.dob = dob;
        this.gender = gender;
        this.image = image;
        this.contactNo = contactNo;
        this.address = address;
        this.hospitalId = hospitalId;
        this.userId = userId;
    }
}

export class Pharmacy {
    constructor(pharmacyId, pharmacyName, address, contactNo, user) {
        this.pharmacyId = pharmacyId;
        this.pharmacyName = pharmacyName;
        this.address = address;
        this.contactNo = contactNo;
        this.user = user;
    }
}

export class MedicationDetail {
    constructor(medicationId, medicationName, pharmacy, quantity, refillThreshold) {
        this.medicationId = medicationId;
        this.medicationName = medicationName;
        this.pharmacy = pharmacy;
        this.quantity = quantity;
        this.refillThreshold = refillThreshold;
    }
}

export class Doctor {
    constructor(doctorId, doctorName, specialization, hospital) {
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.specialization = specialization;
        this.hospital = hospital;
    }
}

export class PrescriptionDetails {
    constructor(prescriptionId, prescribedAt, prescribedBy, patient, ailment, startDate, endDate, prescription, status) {
        this.prescriptionId = prescriptionId;
        this.prescribedAt = prescribedAt;
        this.prescribedBy = prescribedBy;
        this.patient = patient;
        this.ailment = ailment;
        this.startDate = startDate;
        this.endDate = endDate;
        this.prescription = prescription;
        this.status = status;
    }
}

export class RefillRequest {
    constructor(refillRequestId, prescription, medication, requestType, refillQuantity, requestedBy, requestedOn, fulfilledBy, fulfilledOn, status, comments) {
        this.refillRequestId = refillRequestId;
        this.prescription = prescription;
        this.medication = medication;
        this.requestType = requestType;
        this.refillQuantity = refillQuantity;
        this.requestedBy = requestedBy;
        this.requestedOn = requestedOn;
        this.fulfilledBy = fulfilledBy;
        this.fulfilledOn = fulfilledOn;
        this.status = status;
        this.comments = comments;
    }
}

export class Status {
    constructor(statusCode, statusLabel) {
        this.statusCode = statusCode;
        this.statusLabel = statusLabel;
    }
}

export class PrescriptionMedicationMapping {
    constructor(mappingId, prescription, medication) {
        this.mappingId = mappingId;
        this.prescription = prescription;
        this.medication = medication;
    }
}

export class Reminder {
    constructor(
        reminderId,
        medication,
        patient,
        remindOn
    ){
       this.reminderId = reminderId;
       this.medication = medication;
        this.patient =patient;
        this.remindOn = remindOn;
     }
}