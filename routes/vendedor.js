import { Router } from "express"
import httpVendedor from "../controllers/vendedor.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersVendedor from "../helpers/hp_vendedor.js";

const router=new Router()

router.get('/vendedor',httpVendedor.getVendedor);

router.get('/vendedor/:id',[
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
],httpVendedor.getVendedorId);

router.post('/agregar',[
    check("cedula","Digite su cedula").not().isEmpty(),
    check("cedula","Digite su cedula").custom(helpersVendedor.existeCedula),
    check("nombre","Digite su nombre").not().isEmpty(),
    check("cuenta","Digite su cuenta").not().isEmpty(),
    check("cuenta","La cuenta ya existe en la base de datos").custom(helpersVendedor.existeCuenta),
    check("clave","Digite su clave").not().isEmpty(),
    check("clave", "La contraseña debe tener por lo menos 8 digitos con 1 Mayuscula, 1 Minuscula, 2 numeros y un caracter especial (@#$%^&+=!)").custom(helpersVendedor.validarPassword),
    check("telefono","Digite su telefono").not().isEmpty(),
    validarCampos,
],httpVendedor.postVendedor);

router.put('/vendedor/:id',[
    // validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    check("cedula","Digite su cedula").not().isEmpty(),
    check("nombre","Digite su nombre").not().isEmpty(),
    check("cuenta","Digite su cuenta").not().isEmpty(),
    check("clave","Digite su clave").not().isEmpty(),
    check("telefono","Digite su telefono").not().isEmpty(),
    validarCampos,
], httpVendedor.putVendedor);

router.post('/vendedor_datos',[
    check("cuenta","Digite su cuenta").not().isEmpty(),
    check("clave","Digite su clave").not().isEmpty(),
],httpVendedor.login);

router.delete('/vendedor/:id',[
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos,
], httpVendedor.deleteVendedor);

router.put('/inactivarVendedor/:id',[
    // validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
],httpVendedor.putVendedorInactivar)
router.put('/activarVendedor/:id',[
    // validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
],httpVendedor.putVendedorActivar)

export default router
