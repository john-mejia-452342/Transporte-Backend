import { Router } from "express"
import httpBus from "../controllers/bus.js"
import { check } from "express-validator"
import validarCampos from "../middlewares/validar.js"
import helpersBus from "../helpers/hp_bus.js"
import { validarJWT } from "../middlewares/validar-jwt.js"


const router = new Router()

router.get('/buses' ,httpBus.getBuses)

router.get('/bus/:id',[
    // validarJWT,
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "No es Mongo ID").isMongoId(),
], httpBus.getBus);

router.post('/bus/agregar', [
    //validarJWT,
    check("numero_bus", "Digite el numero del bus").not().isEmpty(),
    check("placa", "Digite la placa del bus").not().isEmpty(),
    check("placa", "Esta placa ya existe").custom(helpersBus.existePlaca),
    check("cantidad_asientos", "Digite los Asientos disponibles").not().isEmpty(),
    check("empresa_asignada", "Digite el nombre de la empresa").not().isEmpty(),
    check("conductor_id", "Digite el Conductor").not().isEmpty(),
    check("conductor_id", "No es Mongo ID").isMongoId(),
    validarCampos
], httpBus.postBus);

router.put('/bus/:id', [
    // validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    check("numero_bus", "Digite el numero del bus").not().isEmpty(),
    check("placa", "Digite la placa del bus").not().isEmpty(),
    check("cantidad_asientos", "Digite los Asientos disponibles").not().isEmpty(),
    check("empresa_asignada", "Digite el nombre de la empresa").not().isEmpty(),
    check("conductor_id", "Digite el Conductor").not().isEmpty(),
    check("conductor_id", "No es Mongo ID").isMongoId(),
    validarCampos
], httpBus.putEditarBus);

// router.delete('/bus/:id',[
//     check("id", "Digite el id").not().isEmpty(),
//     check("id", "Digite el id").isMongoId(),
//     validarCampos
// ], httpBus.deleteBus);

router.put('/inactivarBus/:id',[
    // validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
],httpBus.putBusInactivar)
router.put('/activarBus/:id',[
    // validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
],httpBus.putBusActivar)

export default router

