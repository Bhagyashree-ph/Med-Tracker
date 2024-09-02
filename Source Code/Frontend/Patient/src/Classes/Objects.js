const roles = [
    {
        roleName: "PATIENT",
        roleDescription: "One who is under medication"
    },
    {
        roleName: "PROVIDER",
        roleDescription: "One who is under medication"
    },
    {
        roleName: "PHARMACIST",
        roleDescription: "One who is under medication"
    }
];

const user = {
    userId: 1,
    userName: "John Doe",
    password: "password123",
    contactNo: "123-456-7890",
    emailId: "johndoe@example.com",
    role: {
        roleName: "PATIENT",
        roleDescription: "One who is under medication"
    }
};

const patients = [
    {
        patientId: 1,
        govtId: "ABC123",
        idType: "Aadhaar",
        firstName: "Rahul",
        lastName: "Sharma",
        dob: "1990-01-01",
        age: 32,
        gender: "Male",
        image: "rahul_sharma.jpg",
        contactNo: "123-456-7890",
        emailId: "rahulsharma@example.com",
        address: "123 Main St, Anytown, India",
        user: {
            userId: 1,
            userName: "rahulsharma",
            password: "password123",
            contactNo: "123-456-7890",
            emailId: "rahulsharma@example.com",
            roleName: {
                roleName: "Patient",
                roleDescription: "Patient role with limited access"
            }
        }
    },
    {
        patientId: 2,
        govtId: "DEF456",
        idType: "PAN",
        firstName: "Priya",
        lastName: "Gupta",
        dob: "1992-02-02",
        age: 30,
        gender: "Female",
        image: "priya_gupta.jpg",
        contactNo: "987-654-3210",
        emailId: "priyagupta@example.com",
        address: "456 Other St, Othertown, India",
        user: {
            userId: 2,
            userName: "priyagupta",
            password: "password123",
            contactNo: "987-654-3210",
            emailId: "priyagupta@example.com",
            roleName: {
                roleName: "Patient",
                roleDescription: "Patient role with limited access"
            }
        }
    }
];

const hospital = {
  hospitalId: 1,
  hospitalName: "Apollo Hospital",
  address: "14, Apollo Hospital Road, Chennai, Tamil Nadu 600006",
  contactNo: "044-2829 3333"
};

const nurse = {
  nurseId: 1,
  nurseName: "Riya Jain",
  dob: "1995-05-12",
  gender: "Female",
  image: "riya_jain.jpg",
  contactNo: "987-654-3210",
  address: "123, Nurse Colony, Chennai, Tamil Nadu 600006",
  hospital: hospital,
  user: user
};

const pharmacy = {
  pharmacyId: 1,
  pharmacyName: "MedPlus",
  address: "123, Pharmacy Street, Chennai, Tamil Nadu 600006",
  contactNo: "044-2829 1111",
  user: {
    userId: 1,
    username: "medplus",
    password: "medplus123",
    role: "Pharmacy"
  }
};

const doctor = {
  doctorId: 1,
  doctorName: "Dr. Smith",
  specialization: "Cardiology",
  hospital: {
    hospitalId: 1,
    hospitalName: "Apollo Hospital",
    address: "14, Apollo Hospital Road, Chennai, Tamil Nadu 600006",
    contactNo: "044-2829 3333"
  }
};

javascript
const statuses = [
  {
    statusCode: 200,
    statusLabel: "Success"
  },
  {
    statusCode: 400,
    statusLabel: "Bad Request"
  },
  {
    statusCode: 401,
    statusLabel: "Unauthorized"
  },
  {
    statusCode: 404,
    statusLabel: "Not Found"
  },
  {
    statusCode: 500,
    statusLabel: "Internal Server Error"
  }
];

const prescriptionDetails = {
  prescriptionId: 1,
  prescribedAt: new Date("2022-01-01T10:00:00.000Z"),
  prescribedBy: {
    doctorId: 1,
    doctorName: "Dr. Smith",
    specialization: "Cardiology",
    hospital: {
      hospitalId: 1,
      hospitalName: "Apollo Hospital",
      address: "123, Hospital Street, Chennai, Tamil Nadu 600006"
    }
  },
  patient: {
    patientId: 1,
    patientName: "John Doe",
    age: 30,
    address: "123, Patient Street, Chennai, Tamil Nadu 600006"
  },
  ailment: "Fever",
  startDate: new Date("2022-01-01T00:00:00.000Z"),
  endDate: new Date("2022-01-10T00:00:00.000Z"),
  prescription: "Take 2 tablets of Paracetamol every 6 hours",
  status: {
    statusCode: 200,
    statusLabel: "Success"
  }
};

javascript
const medicationDetailsList = [
  {
    medicationId: 1,
    medicationName: "Paracetamol",
    pharmacy: {
      pharmacyId: 1,
      pharmacyName: "Apollo Pharmacy",
      address: "123, Pharmacy Street, Chennai, Tamil Nadu 600006"
    },
    quantity: 30,
    refillThreshold: 10
  },
  {
    medicationId: 2,
    medicationName: "Aspirin",
    pharmacy: {
      pharmacyId: 2,
      pharmacyName: "Fortis Pharmacy",
      address: "456, Pharmacy Street, Bangalore, Karnataka 560076"
    },
    quantity: 20,
    refillThreshold: 5
  }
];

const refillRequestsList = [
  {
    refillRequestId: 1,
    prescription: {
      prescriptionId: 1,
      prescribedAt: new Date("2022-01-01T10:00:00.000Z"),
      prescribedBy: {
        doctorId: 1,
        doctorName: "Dr. Smith",
        specialization: "Cardiology",
        hospital: {
          hospitalId: 1,
          hospitalName: "Apollo Hospital",
          address: "123, Hospital Street, Chennai, Tamil Nadu 600006"
        }
      },
      patient: {
        patientId: 1,
        patientName: "John Doe",
        age: 30,
        address: "123, Patient Street, Chennai, Tamil Nadu 600006"
      },
      ailment: "Fever",
      startDate: new Date("2022-01-01T00:00:00.000Z"),
      endDate: new Date("2022-01-10T00:00:00.000Z"),
      prescription: "Take 2 tablets of Paracetamol every 6 hours",
      status: {
        statusCode: 200,
        statusLabel: "Success"
      }
    },
    medication: {
      medicationId: 1,
      medicationName: "Paracetamol",
      pharmacy: {
        pharmacyId: 1,
        pharmacyName: "Apollo Pharmacy",
        address: "123, Pharmacy Street, Chennai, Tamil Nadu 600006"
      },
      quantity: 30,
      refillThreshold: 10
    },
    requestType: "Refill",
    refillQuantity: 20,
    requestedBy: "John Doe",
    requestedOn: new Date("2022-01-05T10:00:00.000Z"),
    fulfilledBy: null,
    fulfilledOn: null,
    status: {
      statusCode: 200,
      statusLabel: "Pending"
    },
    comments: "Please refill my medication as soon as possible."
  },
  {
    refillRequestId: 2,
    prescription: {
      prescriptionId: 2,
      prescribedAt: new Date("2022-01-15T10:00:00.000Z"),
      prescribedBy: {
        doctorId: 2,
        doctorName: "Dr. Johnson",
        specialization: "Neurology",
        hospital: {
          hospitalId: 2,
          hospitalName: "Fortis Hospital",
          address: "456, Hospital Street, Bangalore, Karnataka 560076"
        }
      },
      patient: {
        patientId: 2,
        patientName: "Jane Doe",
        age: 25,
        address: "456, Patient Street, Bangalore, Karnataka 560076"
      },
      ailment: "Headache",
      startDate: new Date("2022-01-15T00:00:00.000Z"),
      endDate: new Date("2022-01-25T00:00:00.000Z"),
      prescription: "Take 1 tablet of Aspirin every 8 hours",
      status: {
        statusCode: 200,
        statusLabel: "Success"
      }
    },
    medication: {
      medicationId: 2,
      medicationName: "Aspirin",
      pharmacy: {
        pharmacyId: 2,
        pharmacyName: "Fortis Pharmacy",
        address: "456, Pharmacy Street, Bangalore, Karnataka 560076"
      },
      quantity: 20,
      refillThreshold: 5
    },
    requestType: "Refill",
    refillQuantity: 15,
    requestedBy: "Jane Doe",
    requestedOn: new Date("2022-01-20T10:00:00.000Z"),
    fulfilledBy: null,
    fulfilledOn: null,
    status: {
      statusCode: 200,
      statusLabel: "Pending"
    },
    comments: "Please refill my medication as soon as possible."
  }
];

const mapping = {
  mappingId: 1,
  prescription: {
    prescriptionId: 1,
    prescribedAt: new Date("2022-01-01T10:00:00.000Z"),
    prescribedBy: {
      doctorId: 1,
      doctorName: "Dr. Smith",
      specialization: "Cardiology",
      hospital: {
        hospitalId: 1,
        hospitalName: "Apollo Hospital",
        address: "123, Hospital Street, Chennai, Tamil Nadu 600006"
      }
    },
    patient: {
      patientId: 1,
      patientName: "John Doe",
      age: 30,
      address: "123, Patient Street, Chennai, Tamil Nadu 600006"
    },
    ailment: "Fever",
    startDate: new Date("2022-01-01T00:00:00.000Z"),
    endDate: new Date("2022-01-10T00:00:00.000Z"),
    prescription: "Take 2 tablets of Paracetamol every 6 hours",
    status: {
      statusCode: 200,
      statusLabel: "Success"
    }
  },
  medication: {
    medicationId: 1,
    medicationName: "Paracetamol",
    pharmacy: {
      pharmacyId: 1,
      pharmacyName: "Apollo Pharmacy",
      address: "123, Pharmacy Street, Chennai, Tamil Nadu 600006"
    },
    quantity: 30,
    refillThreshold: 10
  }
};

const reminder = {
  reminderId: 1,
  medication: {
    medicationId: 1,
    medicationName: "Paracetamol",
    pharmacy: {
      pharmacyId: 1,
      pharmacyName: "Apollo Pharmacy",
      address: "123, Pharmacy Street, Chennai, Tamil Nadu 600006"
    },
    quantity: 30,
    refillThreshold: 10
  },
  patient: {
    patientId: 1,
    patientName: "John Doe",
    age: 30,
    address: "123, Patient Street, Chennai, Tamil Nadu 600006"
  },
  remindOn: new Date("2022-01-05T10:00:00.000Z")
};