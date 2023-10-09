import express from 'express';
import {
    addDoctor,
    getAllDoctor,
    bulkaddDoctors,
    DoctorinCharge
} from '../controllers/DoctorControllers.js'

const router = express.Router();

router.post ("/doctor", addDoctor);
router.post ("/doctors", bulkaddDoctors);
router.get ("/doctors", getAllDoctor);
router.get ("/doctor/patients", DoctorinCharge);

export default router;