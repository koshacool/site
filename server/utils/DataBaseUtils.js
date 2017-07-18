import mongoose from "mongoose";
import config from '../../etc/config.json';
import '../models';

const Images = mongoose.model('Images');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listNotes(id) {
    return Images.find();
}

export function createNote(data) {
    const Images = new Note({
        title: data.title,
        text: data.text,
        color: data.color,
        createdAt: new Date()
    });

    return Images.save();
}

export function deleteNote(id) {
    return Images.findById(id).remove();
}

