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

export const TodayDoctor = async (req, res) => {
  try {
    const doctors = await Doctor.findAndCountAll();
    const date = new Date();
    const day = date.getDay().toString(); // Convert day to string
    let daytext = ""
    switch (day) {
        case "1":
            daytext = "monday"
            break;
        case "2":
            daytext = "tuesday"
            break;
        case "3":
            daytext = "wednesday"
            break;
        case "4":
            daytext = "thursday"
            break;
        case "5":
            daytext = "friday"
            break;
        default:
            break;
    }

    const availdoctors = [];
    let count = 0;
    
    console.log(doctors)
    if (doctors.rows) {
        doctors.rows.forEach((doctor) => {
          const avail = doctor.availability;
          avail.forEach((availDay) => {
            if (availDay == daytext) {
              availdoctors.push(doctor);
              count ++
            }
          });
        });
      }

      const response = {
        avail: availdoctors,
        count: count
      }

    res.status(200).json(response);
  } catch (error) {
    console.error('Error in TodayDoctor:', error);
    res.status(500).json({ error: `${error.message}` });
  }
};



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