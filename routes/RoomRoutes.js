import express from 'express';
import {
    addRoom,
    bulkaddRoom,
    getRooms,
    getRoomCount
} from '../controllers/RoomControllers.js'

const router = express.Router();

router.post ("/room", addRoom);
router.post ("/rooms", bulkaddRoom);
router.get ("/rooms", getRooms);
router.get ("/roomcount", getRoomCount);

export default router;