import Ticket from "../models/ticket.js";
import Ruta from "../models/ruta.js";
import Bus from "../models/bus.js"

const httpTicket ={
    getTicket: async (req, res) => {
        try {
            const ticket = await Ticket.find().populate("vendedor_id").populate("cliente_id").populate({path: "ruta_id", populate: {path: "horario_id"}})
            .populate({path:"bus_id", populate:{path:"conductor_id"}})
            res.json({ ticket })

        } catch (error) {
            res.status(400).json({ error })
        }

    },
    getTicketId: async (req, res) => {
        const { id } = req.params
        try {
            const ticket = await Ticket.findById(id).populate("vendedor_id").populate("cliente_id").populate({path: "ruta_id", populate: {path: "horario_id"}})
            .populate({path:"bus_id", populate:{path:"conductor_id"}})
            res.json({ ticket })

        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getTicketsPorFechas: async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.query;
            
        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ error: 'Debes proporcionar fechas de inicio y fin.' });
        }
    
        const tickets = await Ticket.find({
            fechahora_venta: {
                $gte: new Date(fechaInicio),
                $lte: new Date(fechaFin),
            },
        }).populate("vendedor_id").populate("cliente_id")
            .populate({path: "bus_id", populate: {path: "ruta_id", populate: {path: "horario_id"}}})
    
        res.json({ tickets });
        } catch (error) {
            res.status(400).json({ error })
            res.status(500).json({ error: 'Error al obtener los tickets.' });
        }
    },
    getTicketsPorVendedor: async (req, res) => {
        try {
            const { vendedorId } = req.query;
    
        if (!vendedorId) {
            return res.status(400).json({ error: 'Debes proporcionar el ID del vendedor.' });
        }
    
        const tickets = await Ticket.find({
            vendedor_id: vendedorId,
        }).populate("vendedor_id").populate("cliente_id")
            .populate({path: "bus_id", populate: {path: "ruta_id", populate: {path: "horario_id"}}})
    
        res.json({ tickets });
        } catch (error) {
            res.status(400).json({ error })
            res.status(500).json({ error: 'Error al obtener los tickets.' });
        }
    },
    getTotalGananciaPorFechas: async (req, res) => {
        try {
        const { fechaInicio, fechaFin } = req.query;
    
        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ error: 'Debes proporcionar fechas de inicio y fin.' });
        }
    
        const tickets = await Ticket.find({
            fechahora_venta: {
                $gte: new Date(fechaInicio),
                $lte: new Date(fechaFin),
            },
          }).populate('ruta_id'); // Agregar la población de ruta_id
    
        const totalGanancia = tickets.reduce((total, ticket) => total + ticket.ruta_id.precio, 0);
    
        res.json({ totalGanancia });
        } catch (error) {
            res.status(400).json({ error })
            res.status(500).json({ error: 'Error al calcular la ganancia total.' });
        }
    },
    getTicketsPorCliente: async (req, res) => {
        try {
            const { clienteId } = req.query;
    
            if (!clienteId) {
                return res.status(400).json({ error: 'Debes proporcionar el ID del cliente.' });
            }
    
            const tickets = await Ticket.find({
                cliente_id: clienteId,
            }).populate("vendedor_id").populate("cliente_id")
            .populate({path: "bus_id", populate: {path: "ruta_id", populate: {path: "horario_id"}}})
    
            res.json({ tickets });
        } catch (error) {
            res.status(400).json({ error });
            res.status(500).json({ error: 'Error al obtener los tickets.' });
        }
    },
    getRutasPorBus: async (req, res) => {
        try {
            const { busId } = req.query;
    
            if (!busId) {
                return res.status(400).json({ error: 'Debes proporcionar el ID del bus.' });
            }
    
            const tickets = await Ticket.find({
                bus_id: busId,
            }).populate("ruta_id");
    
            const rutas = tickets.map(ticket => ticket.ruta_id);
    
            res.json({ rutas });
        } catch (error) {
            res.status(400).json({ error });
            res.status(500).json({ error: 'Error al obtener las rutas.' });
        }
    },
    getGananciaPorRutaYFechas: async (req, res) => {
        try {
            const { rutaId, fechaInicio, fechaFin } = req.query;
    
            if (!rutaId || !fechaInicio || !fechaFin) {
                return res.status(400).json({ error: 'Debes proporcionar la ruta, la fecha de inicio y la fecha de fin.' });
            }
    console.log(fechaInicio);
            const tickets = await Ticket.find({
                ruta_id: rutaId,
                fechahora_venta: {
                    $gte: new Date(fechaInicio),
                    $lte: new Date(fechaFin),
                },
            }).populate("ruta_id");
            console.log(tickets);
    
            const totalGanancia = tickets.reduce((total, ticket) => total + ticket.ruta_id.precio, 0);
    
            res.json({ totalGanancia });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
    postTicket: async (req, res) => {
        try {
            const { vendedor_id, cliente_id, bus_id, ruta_id, no_asiento, fecha_departida } = req.body
            const ticket = new Ticket({ vendedor_id, cliente_id, bus_id, ruta_id, no_asiento, fecha_departida  })
            await ticket.save()

            res.json({ ticket })
        } catch (error) {
            res.status(400).json({ error })
        }


    },
    putEditarTicket: async (req, res)=>{
        try {
            const { id } = req.params
            const { vendedor_id, cliente_id, bus_id, ruta_id, no_asiento, fecha_departida} = req.body
            const ticket = await
                Ticket.findByIdAndUpdate(id, { vendedor_id, cliente_id, bus_id, ruta_id, no_asiento, fecha_departida}, { new: true });
            res.json({ticket})
        } catch (error) {
            res.status(400).json({error})
        }
    },
    deleteTicket: async(req,res)=>{
        try {
            const {id}=req.params
            const ticket= await Ticket.findByIdAndRemove(id)
            res.json({ticket})
        } catch (error) {
            res.status(400).json({error})
        }
    },   
    putTicketInactivar: async (req,res)=>{
        try {
            const {id}=req.params
            const ticket=await Ticket.findByIdAndUpdate(id,{estado:0},{new:true})
            res.json({ticket})
        } catch (error) {
            res.status(400).json({error})
            
        }
    },
    putTicketActivar: async (req,res)=>{
        try {
            const {id}=req.params
            const ticket=await Ticket.findByIdAndUpdate(id,{estado:1},{new:true})
            res.json({ticket})
        } catch (error) {
            res.status(400).json({error})
        }
    },
    buscarRuta:async (req, res) =>{
        try {
            const {id_ruta, id_bus, fecha} = req.query;
            const idRuta = await Ruta.findById(id_ruta)
            const idBus = await Bus.findById(id_bus)
        
            const f1 = new Date(fecha+"T00:00:00.000Z")
            const f2 = new Date(fecha+"T23:59:59.000Z")
            const buscar= await Ticket.find({
            $and:[
                {ruta_id:idRuta._id},
                {bus_id:idBus._id},
                {fecha_departida:
                    {
                        $gte: f1,
                        $lte: f2 
                    }
                },
            ]
            }).populate("vendedor_id").populate("cliente_id").populate({path: "ruta_id", populate: {path: "horario_id"}})
            .populate({path:"bus_id", populate:{path:"conductor_id"}})

            let puestos=[]

            buscar.forEach((r,i)=>{
                puestos.push(r.no_asiento)
            })

            res.json({buscar, puestos})
        } catch (error) {
            res.status(400).json({ error })
        }      
      }
    
}
export default httpTicket