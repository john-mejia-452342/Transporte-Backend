import mongoose from "mongoose";

const rutaSchema = new mongoose.Schema({
    precio:{type: Number, require:true},
    horario_id:{type:mongoose.Schema.Types.ObjectId,ref:'Horario', require:true},
    origen:{type:String, require:true},
    destino:{type:String, require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}

});

export default mongoose.model("Ruta", rutaSchema)
