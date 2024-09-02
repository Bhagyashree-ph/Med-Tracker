
const data = {
    "roles": [
        {
            "roleName": "Admin",
            "roleDescription": "Administrator role"
        },
        {
            "roleName": "Doctor",
            "roleDescription": "Doctor role"
        },
        {
            "roleName": "Nurse",
            "roleDescription": "Nurse role"
        },
        {
            "roleName": "Pharmacist",
            "roleDescription": "Pharmacist role"
        },
        {
            "roleName": "Patient",
            "roleDescription": "Patient role"
        }
    ],

    "users": [
        {
            "userId": 1,
            "userName": "admin",
            "password": "password",
            "contactNo": "1234567890",
            "emailId": "admin@example.com",
            "roleName": "Admin"
        },
        {
            "userId": 2,
            "userName": "doctor1",
            "password": "password",
            "contactNo": "9876543210",
            "emailId": "doctor1@example.com",
            "roleName": "Doctor"
        },
        {
            "userId": 3,
            "userName": "nurse1",
            "password": "password",
            "contactNo": "1112223333",
            "emailId": "nurse1@example.com",
            "roleName": "Nurse"
        },
        {
            "userId": 4,
            "userName": "pharmacist1",
            "password": "password",
            "contactNo": "4445556666",
            "emailId": "pharmacist1@example.com",
            "roleName": "Pharmacist"
        },
        {
            "userId": 5,
            "userName": "patient1",
            "password": "password",
            "contactNo": "7778889990",
            "emailId": "patient1@example.com",
            "roleName": "Patient"
        }
    ],

    "patients": [
        {
            "patientId": 1,
            "govtId": "1234567890",
            "idType": "Aadhaar",
            "firstName": "John",
            "lastName": "Doe",
            "dob": "1990-01-01",
            "age": 32,
            "gender": "Male",
            "image": "john_doe.jpg",
            "contactNo": "7778889990",
            "emailId": "patient1@example.com",
            "address": "123 Main St",
            "user": {
                "userId": 5,
                "userName": "patient1",
                "password": "password",
                "contactNo": "7778889990",
                "emailId": "patient1@example.com",
                "roleName": "Patient"
            }
        }
    ],

    "hospitals": [
        {
            "hospitalId": 1,
            "hospitalName": "Hospital 1",
            "address": "123 Hospital Dr",
            "contactNo": "5556667777"
        }
    ],

    "nurses": [
        {
            "nurseId": 1,
            "nurseName": "Nurse 1",
            "dob": "1980-01-01",
            "gender": "Female",
            "image": "nurse1.jpg",
            "contactNo": "1112223333",
            "address": "456 Nurse St",
            "hospitalId": 1,
            "userId": 3
        }
    ],

    "pharmacies": [
        {
            "pharmacyId": 1,
            "pharmacyName": "Pharmacy 1",
            "address": "789 Pharmacy Dr",
            "contactNo": "4445556666",
            "user": {
                "userId": 4,
                "userName": "pharmacist1",
                "password": "password",
                "contactNo": "4445556666",
                "emailId": "pharmacist1@example.com",
                "roleName": "Pharmacist"
            }
        }
    ],

    "medicationDetails": [
        {
            "medicationId": 1,
            "medicationName": "Medication 1",
            "pharmacy": {
                "pharmacyId": 1,
                "pharmacyName": "Pharmacy 1",
                "address": "789 Pharmacy Dr",
                "contactNo": "4445556666"
            },
            "quantity": 100,
            "refillThreshold": 20
        }
    ],

    "doctors": [
        {
            "doctorId": 1,
            "doctorName": "Doctor 1",
            "specialization": "General Physician",
            "hospital": {
                "hospitalId": 1,
                "hospitalName": "Hospital 1",
                "address": "123 Hospital Dr",
                "contactNo": "5556667777"
            }
        }
    ],

    "prescriptionDetails": [
        {
            "prescriptionId": 1,
            "prescribedAt": "2022-01-01",
            "prescribedBy": {
                "doctorId": 1,
                "doctorName": "Doctor 1",
                "specialization": "General Physician",
                "hospital": {
                    "hospitalId": 1,
                    "hospitalName": "Hospital 1",
                    "address": "123 Hospital Dr",
                    "contactNo": "5556667777"
                }
            },
            "patient": {
                "patientId": 1,
                "govtId": "1234567890",
                "idType": "Aadhaar",
                "firstName": "John",
                "lastName": "Doe",
                "dob": "1990-01-01",
                "age": 32,
                "gender": "Male",
                "image": "john_doe.jpg",
                "contactNo": "7778889990",
                "emailId": "patient1@example.com",
                "address": "123 Main St",
                "user": {
                    "userId": 5,
                    "userName": "patient1",
                    "password": "password",
                    "contactNo": "7778889990",
                    "emailId": "patient1@example.com",
                    "roleName": "Patient"
                }
            },
            "ailment": "Fever",
            "startDate": "2022-01-01",
            "endDate": "2022-01-10",
            "prescription": "Take 2 tablets twice a day",
            "status": "Active"
        }
    ],

    "refillRequests": [
        {
            "refillRequestId": 1,
            "prescription": {
                "prescriptionId": 1,
                "prescribedAt": "2022-01-01",
                "prescribedBy": {
                    "doctorId": 1,
                    "doctorName": "Doctor 1",
                    "specialization": "General Physician",
                    "hospital": {
                        "hospitalId": 1,
                        "hospitalName": "Hospital 1",
                        "address": "123 Hospital Dr",
                        "contactNo": "5556667777"
                    }
                },
                "patient": {
                    "patientId": 1,
                    "govtId": "1234567890",
                    "idType": "Aadhaar",
                    "firstName": "John",
                    "lastName": "Doe",
                    "dob": "1990-01-01",
                    "age": 32,
                    "gender": "Male",
                    "image": "john_doe.jpg",
                    "contactNo": "7778889990",
                    "emailId": "patient1@example.com",
                    "address": "123 Main St",
                    "user": {
                        "userId": 5,
                        "userName": "patient1",
                        "password": "password",
                        "contactNo": "7778889990",
                        "emailId": "patient1@example.com",
                        "roleName": "Patient"
                    }
                },
                "ailment": "Fever",
                "startDate": "2022-01-01",
                "endDate": "2022-01-10",
                "prescription": "Take 2 tablets twice a day",
                "status": "Active"
            },
            "medication": {
                "medicationId": 1,
                "medicationName": "Medication 1",
                "pharmacy": {
                    "pharmacyId": 1,
                    "pharmacyName": "Pharmacy 1",
                    "address": "789 Pharmacy Dr",
                    "contactNo": "4445556666"
                },
                "quantity": 100,
                "refillThreshold": 20
            },
            "requestType": "Refill",
            "refillQuantity": 50,
            "requestedBy": {
                "userId": 5,
                "userName": "patient1",
                "password": "password",
                "contactNo": "7778889990",
                "emailId": "patient1@example.com",
                "roleName": "Patient"
            },
            "requestedOn": "2022-01-05",
            "fulfilledBy": null,
            "fulfilledOn": null,
            "status": "Pending",
            "comments": "Refill request for Medication 1"
        }
    ],

    "statuses": [
        {
            "statusCode": 1,
            "statusLabel": "Active"
        },
        {
            "statusCode": 2,
            "statusLabel": "Inactive"
        },
        {
            "statusCode": 3,
            "statusLabel": "Pending"
        },
        {
            "statusCode": 4,
            "statusLabel": "Fulfilled"
        }
    ],

    "prescriptionMedicationMappings": [
        {
            "mappingId": 1,
            "prescription": {
                "prescriptionId": 1,
                "prescribedAt": "2022-01-01",
                "prescribedBy": {
                    "doctorId": 1,
                    "doctorName": "Doctor 1",
                    "specialization": "General Physician",
                    "hospital": {
                        "hospitalId": 1,
                        "hospitalName": "Hospital 1",
                        "address": "123 Hospital Dr",
                        "contactNo": "5556667777"
                    }
                },
                "patient": {
                    "patientId": 1,
                    "govtId": "1234567890",
                    "idType": "Aadhaar",
                    "firstName": "John",
                    "lastName": "Doe",
                    "dob": "1990-01-01",
                    "age": 32,
                    "gender": "Male",
                    "image": "john_doe.jpg",
                    "contactNo": "7778889990",
                    "emailId": "patient1@example.com",
                    "address": "123 Main St",
                    "user": {
                        "userId": 5,
                        "userName": "patient1",
                        "password": "password",
                        "contactNo": "7778889990",
                        "emailId": "patient1@example.com",
                        "roleName": "Patient"
                    }
                },
                "ailment": "Fever",
                "startDate": "2022-01-01",
                "endDate": "2022-01-10",
                "prescription": "Take 2 tablets twice a day",
                "status": "Active"
            },
            "medication": {
                "medicationId": 1,
                "medicationName": "Medication 1",
                "pharmacy": {
                    "pharmacyId": 1,
                    "pharmacyName": "Pharmacy 1",
                    "address": "789 Pharmacy Dr",
                    "contactNo": "4445556666"
                },
                "quantity": 100,
                "refillThreshold": 20
            }
        }
    ],

    "reminders": [
        {
            "reminderId": 1,
            "medication": {
                "medicationId": 1,
                "medicationName": "Medication 1",
                "pharmacy": {
                    "pharmacyId": 1,
                    "pharmacyName": "Pharmacy 1",
                    "address": "789 Pharmacy Dr",
                    "contactNo": "4445556666"
                },
                "quantity": 100,
                "refillThreshold": 20
            },
            "patient": {
                "patientId": 1,
                "govtId": "1234567890",
                "idType": "Aadhaar",
                "firstName": "John",
                "lastName": "Doe",
                "dob": "1990-01-01",
                "age": 32,
                "gender": "Male",
                "image": "john_doe.jpg",
                "contactNo": "7778889990",
                "emailId": "patient1@example.com",
                "address": "123 Main St",
                "user": {
                    "userId": 5,
                    "userName": "patient1",
                    "password": "password",
                    "contactNo": "7778889990",
                    "emailId": "patient1@example.com",
                    "roleName": "Patient"
                }
            },
            "remindOn": "2022-01-05"
        }
    ]
}