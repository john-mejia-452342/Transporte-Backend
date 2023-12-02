import mongoose from "mongoose";

const vendedorSchema = new mongoose.Schema({
    cedula: { type: String, require:true, unique:true },
    nombre: { type: String, minlenght: 5, require:true },
    cuenta: { type: String, require:true},
    clave: { type: String, require:true},
    telefono: {type: String, require:true},
    createAT: {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
});


export default mongoose.model("Vendedor", vendedorSchema)
