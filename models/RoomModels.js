import {
    DataTypes
} from 'sequelize';
import db from '../config/database.js';

const Room = db.define("room", {
    room_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    room_type: {
        type: DataTypes.ENUM('VIP', 'Regular'),
        allowNull: false
    },
    isOccupied: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    floor: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{ timestamps: false });

export default Room;


export const RoomdefineAssociations = async () => {
    const { default: Patient } = await import('./PatientModels.js');
    Room.hasOne(Patient, {sourceKey: 'room_id', foreignKey: 'room_id'});
};