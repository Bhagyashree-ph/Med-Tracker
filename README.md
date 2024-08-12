# Medication Management Tool

The Medication Management Tool is a digital solution designed to help patients efficiently manage their various medications. 

The primary goals of this project are:

- To reduce the likelihood of missed doses
- To ensure timely refills
- To provide a centralized platform for users to input, track, and receive reminders for their prescriptions

Key features of the Medication Management Tool include:

- Ability to input prescription details
- Setting customizable medication reminders
- Receiving alerts for upcoming doses and refills
- Storing information about healthcare providers and pharmacies
- Integrating with pharmacy systems for real-time updates

By offering a comprehensive and user-friendly experience, the tool aims to improve medication adherence and overall well-being for patients with multiple prescriptions.

## Installation and Getting Started

Install node of version v20.15.0 with npm of version 10.7.0
Install STS of version 3.8.3
Install Oracle 10g express edition for database.
Extract the Zip file.

### Running the script file

Open the command prompt.
Redirect to the location where you extracted the Zip file.
Login as system in sqlplus.
Run the command

```@acripts.sql```

Now create a new connection n the Sqldeveloper:
Click on new connection -> Give connection name -> Enter username and password as 'MT' -> Test -> Connect

If you are not able to find triggers and job schedulers in that connection:
Step 1: Open the "scripts.sql" file.
Step 2: Copy the trigger and job schedulers sql command.
Step 3: Open a new workspace in the Sqldeveloper of the connection what you create before.
Step 4: Paste the sql command.
Step 5: Select the commands and run it.

### Starting with Spring Boot

Open the folder ```Backend``` as workspace in your STS IDE.
If the project is not visible in STS choose
File->Open Projects from FileSystem and from the current workspace directory choose the projects:
1. Admin
2. Patient
3. Provider
4. Pharmacy

To Run:
right click on the projects and choose run as spring boot app.

### Starting with React

Open the folder ```Frontend``` as workspace in your ```Visual Studio Code``` IDE.

Open the Command prompt in the IDE and add the following libraries.

**Adding some libraries**

```
npm install -g @mui/material @emotion/react @emotion/styled

npm install -g @mui/material @mui/styled-engine-sc styled-components

npm install -g @mui/icons-material

npm install -g moment --save

npm install -g axios
```

If the above commands doesn't work, then open the cmd and navigate to respective project directory and then run these commands. Then repeat same for all the projects in the Frontend.

To Run:
Change to the respective project directory and use the command 
```npm start```

## Demo
Ready to take control of your medication management? [Explore the Medication Management Tool here!](https://drive.google.com/file/d/1-sryir5O2oP-7z3tWL_26T3KF_Fk-oUT/view?usp=sharing)