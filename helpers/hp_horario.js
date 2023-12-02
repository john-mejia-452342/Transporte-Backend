import Horario from "../models/horario.js";

const helpersHorario = {
    existeHolderById: async (id, req) => {
        const existe = await Horario.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }

        req.req.HorarioUpdate = existe
    },
}
export default helpersHorario