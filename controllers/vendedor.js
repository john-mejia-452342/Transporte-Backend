import Vendedor from "../models/vendedor.js";
import bcryptjs from "bcryptjs"
import  {generarJWT} from "../middlewares/validar-jwt.js";

const httpVendedor = {
    getVendedor: async (req, res) => {
        try {
            const vendedor = await Vendedor.find()
            res.json({ vendedor })
            
        } catch (error) {
            res.status(400).json({error})
        }

    },

    getVendedorId: async (req, res) => {
        const {id}=req.params
        try {
            const vendedor = await Vendedor.findById(id)
            res.json({ vendedor })
            
        } catch (error) {
            res.status(400).json({error})
        }
    },

    postVendedor: async (req, res) => {
        try {
            const { cedula, nombre, cuenta, clave, telefono} = req.body
            const vendedor = new Vendedor({ cedula, nombre, cuenta, clave, telefono})
            const salt = bcryptjs.genSaltSync();
            vendedor.clave = bcryptjs.hashSync(clave, salt)

            await vendedor.save()

            res.json({ vendedor })
        } catch (error) {
            res.status(400).json({ error })
        }
    },

    putVendedor: async (req,res) => {
        try {
            const {id}=req.params
            const { cedula, nombre, cuenta, clave, telefono} =req.body
            const vendedor=await 
                Vendedor.findByIdAndUpdate(id,{ cedula, nombre, cuenta, clave, telefono} ,{new:true});
                const salt = bcryptjs.genSaltSync();
                vendedor.clave = bcryptjs.hashSync(clave, salt)
                await vendedor.save()
                    res.json({vendedor})
            
        } catch (error) {
            res.status(400).json({error})
        }
    },
    login: async (req, res) => {
        const { cuenta, clave } = req.body;

        try {
            const vendedor = await Vendedor.findOne({ cuenta })
            if (!vendedor) {
                return res.status(400).json({
                    msg: "No se encontro ningun usuario"
                })
            }

            if (vendedor.estado === 0) {
                return res.status(400).json({
                    msg: "Vendedor Inactivo"
                })
            }

            const validPassword = bcryptjs.compareSync(clave, vendedor.clave);
            if (!validPassword) {
                return res.status(401).json({
                    msg: "Contraseña incorrecta"
                })
            }

            const token = await generarJWT(vendedor.id);

            res.json({
                vendedor,
                token
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    },

    deleteVendedor: async(req,res)=>{
        try {
            const {id}=req.params
            const vendedor= await Vendedor.findByIdAndRemove(id)
            res.json({vendedor})
        } catch (error) {
            res.status(400).json({error})
        }
    },
    putVendedorInactivar: async (req,res)=>{
        try {
            const {id}=req.params
            const vendedor=await Vendedor.findByIdAndUpdate(id,{estado:0},{new:true})
            res.json({vendedor})
        } catch (error) {
            res.status(400).json({error})
            
        }
    },
    putVendedorActivar: async (req,res)=>{
        try {
            const {id}=req.params
            const vendedor=await Vendedor.findByIdAndUpdate(id,{estado:1},{new:true})
            res.json({vendedor})
        } catch (error) {
            res.status(400).json({error})
        }
    }
};

export default httpVendedor;