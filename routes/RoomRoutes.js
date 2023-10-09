import express from 'express';
import {
    addRoom,
    bulkaddRoom,
    getRooms,
    getRoomCount,
    checkin,
    RoomandPatient
} from '../controllers/RoomControllers.js'

const router = express.Router();

router.post ("/room", addRoom);
router.post ("/rooms", bulkaddRoom);
router.get ("/rooms", getRooms);
router.get ("/roomcount", getRoomCount);
router.get ("/room/patient", RoomandPatient);
router.put ("/room", checkin);

export default router;