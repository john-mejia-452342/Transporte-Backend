import Ruta from "../models/ruta.js";

const helpersRuta = {
    existeHolderById: async (id, req) => {
        const existe = await Ruta.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }

        req.req.RutaUpdate = existe
    },
}
export default helpersRuta