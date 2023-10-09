import Patient from '../models/PatientModels.js';
import Room from '../models/RoomModels.js';
import Doctor from '../models/DoctorModels.js';

export const addPatient = async (req, res) => {
    try {
        await Patient.create(req.body);
        res.status(201).json({
            msg: 'Patient Created'
        });
    } catch (error) {
        res.send(error.message);
    }
}

export const PatientinRoom = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            where: {
                patient_id: req.query.patient_id
            },
            include: [
                {model: Doctor},
                {model: Room}
            ]
        });

        const response = {
            patient: patient,
            room: patient.Room,
            doctor: patient.Doctor
        }

        res.status(200).json({
            response
        });
    } catch (error) {
        console.error('Error getting patient by room_id:', error);
        res.status(500).json({
            error: `${error.message}`
        });
    }
}


export const getAllPatients = async (req, res) => {
    const status = req.query.status;
    const whereCondition = {};

    if (status && status !== 'all') {
        whereCondition.status = status;
    }

    try {
        const patients = await Patient.findAndCountAll({
            where: whereCondition
        });
        const response = {
            count: patients.count,
            patients: patients.rows
        };

        res.status(201).json(response);
    } catch (error) {
        res.send(error.message)
    }
}

export const bulkaddPatients = async (req, res) => {
    const PatientsToInsert = req.body;
    try {
        await Patient.bulkCreate(PatientsToInsert);
        res.status(201).json({
            msg: 'Patients Created'
        });
    } catch (error) {
        res.send(error.message);
    }
}

export const checkOut = async (req, res) => {
    try {
        const patient_id = req.query.patient_id;
        const patient = await Patient.findByPk(patient_id, {
            include: Room
        });

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found.' });
        }

        if (patient.status === 'Checked In') {
            await patient.update({
                checkout_date: new Date(),
                room_id: null,
                doctor_id: null,
                status: 'Discharged'
            });
            await patient.room.update({
                isOccupied: false
            });
        } else {
            return res.status(400).json({ error: 'Patient is not checked in.' });
        }

        const response = {
            patient: patient
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error during checkout:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};