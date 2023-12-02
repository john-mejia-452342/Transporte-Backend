import Horario from "../models/horario.js";

const httpHorario ={
    getHorario: async (req, res) => {
        try {
            const horario = await Horario.find()
            res.json({ horario })

        } catch (error) {
            res.status(400).json({ error })
        }

    },
    getHorarioId: async (req, res) => {
        const { id } = req.params
        try {
            const horario = await Horario.findById(id)
            res.json({ horario })

        } catch (error) {
            res.status(400).json({ error })
        }
    },

    postHorario: async (req, res) => {
        try {
            const { hora_partida, hora_llegada} = req.body
            const horario = new Horario({ hora_partida, hora_llegada})
            await horario.save()

            res.json({ horario })
        } catch (error) {
            res.status(400).json({ error })
        }


    },
    putHorario: async (req, res) => {
        try {
            const { id } = req.params
            const { hora_partida, hora_llegada} = req.body
            const horario = await
                Horario.findByIdAndUpdate(id, { hora_partida, hora_llegada }, { new: true });
            res.json({horario})
        } catch (error) {
            res.status(400).json({error})
        }

    },
    deleteHorario: async (req,res) => {
        try {
            const { id } = req.params
            const horario = await Horario.findByIdAndDelete(id)
            res.json(horario + `Horario eliminado`)
        } catch (error) {
            res.status(400).json({error})
        }
    },
    putHorarioInactivar: async (req,res)=>{
        try {
            const {id}=req.params
            const horario=await Horario.findByIdAndUpdate(id,{estado:0},{new:true})
            res.json({horario})
        } catch (error) {
            res.status(400).json({error})
            
        }
    },
    putHorarioActivar: async (req,res)=>{
        try {
            const {id}=req.params
            const horario=await Horario.findByIdAndUpdate(id,{estado:1},{new:true})
            res.json({horario})
        } catch (error) {
            res.status(400).json({error})
        }
    }

}
export default httpHorario