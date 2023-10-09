import { error } from 'console';
import Doctor from '../models/DoctorModels.js';
import Patient from '../models/PatientModels.js';
import Room from '../models/RoomModels.js'

export const addDoctor = async (req, res) => {
    try {
        await Doctor.create(req.body);
        res.status(201).json({
            msg: 'Doctor Created'
        });
    } catch (error) {
        res.send(error.message);
    }
}

export const getAllDoctor = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        if (!doctors || doctors.length === 0) {
            res.status(404).json({ error: 'No doctors found.' });
        } else {
            res.status(201).json(doctors);
        }
    } catch (error) {
        console.error('Error in TodayDoctor:', error);
    // res.status(500).json({ error: `${error.message}` });
    }
}



export const bulkaddDoctors = async (req, res) => {
    const DoctorsToInsert = req.body;
    try {
        await Doctor.bulkCreate(DoctorsToInsert);
        res.status(201).json({
            msg: 'Doctors Created'
        });
    } catch (error) {
        res.send(error.message);
    }
}

export const DoctorinCharge = async (req, res) => {
    try {
        const doctor = await Patient.findAll({
            where: {
                doctor_id: req.query.doctor_id
            },
            include: Room
        });

        const response = {
            patient: doctor,
            room: doctor.Room
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