import mongoose from "mongoose";

const conductorSchema = new mongoose.Schema({
    cedula: { type: String, require: true , unique:true},
    nombre: { type: String, require: true },
    experiencia: { type: String, require: true },
    telefono: { type: String, require: true },
    createAT: { type:Date,default: Date.now },
    estado: { type: Boolean, default: 1 }

});

export default mongoose.model("Conductor", conductorSchema)
