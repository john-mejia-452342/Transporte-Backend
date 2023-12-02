import Vendedor from "../models/vendedor.js";

const helpersVendedor = {
    existeCedula: async (cedula)=>{
        const existe = await Vendedor.findOne({cedula})
        if (existe) {
            throw new Error("La cedula ya esta registrada")
        }
    },

    existeCuenta: async (cuenta)=>{
        const existe = await Vendedor.findOne({cuenta})

        if(existe){
            throw new Error("La cuenta ya esta registrada en la base de datos.")
        }
    },
    validarPassword: async(clave,req)=>{
        const vali = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
        if (!vali.test(clave)) {
            throw new Error("La contraseña debe tener por lo menos 8 digitos con 1 Mayscula, 1 Minuscula, 2 numeros y un caracter especial (@#$%^&+=!)");
        }
    }, 
}
export default helpersVendedor