import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
    numero_bus: { type:Number, require:true, unique:true },
    placa: {type:String, require:true,unique:true},
    cantidad_asientos: { type: String, require:true  },
    empresa_asignada: { type: String, require:true },
    conductor_id: {type:mongoose.Schema.Types.ObjectId,ref:'Conductor', require:true},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}

});

export default mongoose.model("Bus", busSchema)
