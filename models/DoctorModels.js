import {
    DataTypes
} from 'sequelize';
import db from '../config/database.js';


const Doctor = db.define("doctor", {
    doctor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female'),
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
    specialty: {
        type: DataTypes.ENUM('Pediatrician', 'Cardiologist', 'Opthalmologist', 'Psychiatrist', 'Neurologist', 'Dermatologist'),
        allowNull: false,
    },
    availability: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return this.getDataValue('availability').split(',')
        },
        set(val) {
            this.setDataValue('availability', val);
        },
    }

}, {
    timestamps: false
});



export default Doctor;

export const defineAssociations = async () => {
    const { default: Patient } = await import('./PatientModels.js');
    Doctor.hasMany(Patient, {sourceKey: 'doctor_id', foreignKey: 'doctor_id'});
};
