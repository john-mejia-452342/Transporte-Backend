import mongoose from "mongoose";


const ticketSchema = new mongoose.Schema({
    vendedor_id: {type:mongoose.Schema.Types.ObjectId,ref:'Vendedor', require:true},
    cliente_id:{type:mongoose.Schema.Types.ObjectId,ref:'Cliente', require:true},
    ruta_id:{type:mongoose.Schema.Types.ObjectId, ref: "Ruta", require:true},
    bus_id:{type:mongoose.Schema.Types.ObjectId,ref:'Bus', require:true},
    no_asiento:{type: Number, require:true, unique:true},
    fecha_departida: {type: Date, require:true},
    fechahora_venta:{type:Date, default: Date.now},
    createAT : {type:Date,default: Date.now },
    estado:{type:Boolean, default:1}
})

export default mongoose.model("Ticket", ticketSchema)
