import mongoose from "mongoose";

const horarioSchema = new mongoose.Schema({

    hora_partida: { type: String, require: true },
    hora_llegada: { type: String, require: true },
    createAT: { type:Date,default: Date.now },
    estado: { type: Boolean, default: 1 }
});

export default mongoose.model("Horario", horarioSchema)
