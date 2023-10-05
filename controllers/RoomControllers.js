import Room from '../models/RoomModels.js';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());


export const addRoom = async (req, res) => {
    try {
        await Room.create(req.body);
        res.status(201).json({msg:'Room Created'});
    } catch (error) {
        res.send (error.message);
    }
}

export const bulkaddRoom = async (req, res) => {
    const roomToInsert = req.body;
    try {
        await Room.bulkCreate(roomToInsert);
        res.status(201).json({msg:'Rooms Created'});
    } catch (error) {
        res.send (error.message);
    }
}

export const getRooms = async (req,res) => {
    const floorreq = req.query.floor;
    const type = req.query.room_type;
    const occupied = req.query.isOccupied;

    const whereCondition = {
      };
    
      if (floorreq && floorreq !== 'all') {
        whereCondition.floor = floorreq;
      }

      if (occupied === 'true') {
        whereCondition.isOccupied = 1;
      } else if (occupied === 'false') {
        whereCondition.isOccupied = 0;
      }
    
      if (type && type !== 'all') {
        whereCondition.room_type = type;
      }


    try { 
        const room = await Room.findAndCountAll({
            where: whereCondition
        });
        const response = {
            message: room.count,
            rooms: room.rows
          };
      
          res.status(201).json(response);
    } catch (error) {
        res.send (error.message)
    }
}

export const getRoomCount = async (req, res) => {
  try {
    const regularCount = await Room.count({
      where: {
        room_type: 'Regular',
        isOccupied: false
      }
    });

    const vipCount = await Room.count({
      where: {
        room_type: 'VIP',
        isOccupied: false
      }
    });

    const allCount = await Room.count({})
    const avail = regularCount + vipCount;
    const avail_dec = avail/allCount * 100
    const avail_perc = Number(avail_dec.toFixed(1))
    const used_perc = Number((100 - avail_dec).toFixed(1))

    const response = {
      count_reg: regularCount,
      count_vip: vipCount,
      room_count: regularCount + vipCount,
      avail_perc: avail_perc,
      used_perc: used_perc,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


