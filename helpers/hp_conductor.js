import Conductor from "../models/conductor.js";

const helpersConductor = {
    existeCedula: async (cedula)=>{
        const existe = await Conductor.findOne({cedula})
        if (existe) {
            throw new Error("La cedula ya esta registrada")
        }
    },
}
export default helpersConductor