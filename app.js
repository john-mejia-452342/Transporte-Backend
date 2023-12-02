import  express  from "express";
import mongoose from 'mongoose';
import "dotenv/config"
import bus from "./routes/bus.js"
import cliente from "./routes/cliente.js"
import conductor from "./routes/conductor.js";
import horario from "./routes/horario.js";
import ruta from "./routes/ruta.js"
import ticket from "./routes/ticket.js"
import vendedor from "./routes/vendedor.js"
import cors from "cors"

const app = express()
app.use(express.json()) 

app.use(cors());


app.use("/api/bus", bus)
app.use("/api/cliente", cliente)
app.use("/api/conductor", conductor)
app.use("/api/horario", horario)
app.use("/api/ruta", ruta)
app.use("/api/ticket", ticket)
app.use("/api/vendedor", vendedor)

app.listen(process.env.PORT,()=>{
    mongoose.connect(process.env.mongoDB)
    .then(() => console.log('Conectado!'));
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
})