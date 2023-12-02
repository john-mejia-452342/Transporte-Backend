import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
    cedula: { type: Number, require:true, unique:true},
    nombre: { type: String, minlenght: 5, require:true },
    telefono: { type: Number, require: true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});

export default mongoose.model("Cliente", clienteSchema)
