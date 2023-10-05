import express from 'express';
import {
    addDoctor,
    getAllDoctor,
    bulkaddDoctors,
    DoctorinCharge,
    TodayDoctor
} from '../controllers/DoctorControllers.js'

const router = express.Router();

router.post ("/doctor", addDoctor);
router.post ("/doctors", bulkaddDoctors);
router.get ("/doctors", getAllDoctor);
router.get ("/doctor/patients", DoctorinCharge);
router.get ("/doctor/today", TodayDoctor);

export default router;