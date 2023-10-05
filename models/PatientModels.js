import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import Room from './RoomModels.js';
import Doctor from './DoctorModels.js';


const Patient = db.define ("patient", {
    patient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM ('Male', 'Female'),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    },
    birthplace: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bloodtype: {
        type: DataTypes.ENUM ('O-', 'O+', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM ('Checked In', 'Discharged'),
        allowNull: false,
        defaultValue: 'Checked In'
    }, 
    checkin_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    checkout_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    
    
}, { timestamps: false });


    Patient.belongsTo(Room, {foreignKey: 'room_id'});
    Patient.belongsTo(Doctor, {foreignKey: 'doctor_id'});


export default Patient;





  