import { Router } from "express"
import httpHorario from "../controllers/horario.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import helpersHorario from "../helpers/hp_horario.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = new Router()

router.get('/horario',httpHorario.getHorario);

router.get('/horario/:id',[
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
],httpHorario.getHorarioId);

router.post('/agregar',[
    check("hora_partida", "Digite la hora de partida").not().isEmpty(),
    check("hora_partida", "Digite la hora de partida en formato HH:mm:ss")
        .matches(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, "i")
        .withMessage('La hora de partida debe tener el formato HH:mm:ss'),
    check("hora_llegada", "Digite la hora estimada de llegada").not().isEmpty(),
    check("hora_llegada", "Digite la hora estimada de llegada en formato HH:mm:ss")
        .matches(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, "i")
        .withMessage('La hora de llegada debe tener el formato HH:mm:ss'),
    validarCampos
],httpHorario.postHorario);

router.put('/horario/:id',[
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    check("hora_partida", "Digite la hora de partida").not().isEmpty(),
    check("hora_partida", "Digite la hora de partida en formato HH:mm:ss")
        .matches(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, "i")
        .withMessage('La hora de partida debe tener el formato HH:mm:ss'),
    check("hora_llegada", "Digite la hora estimada de llegada").not().isEmpty(),
    check("hora_llegada", "Digite la hora estimada de llegada en formato HH:mm:ss")
        .matches(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, "i")
        .withMessage('La hora de llegada debe tener el formato HH:mm:ss'),
    validarCampos
], httpHorario.putHorario);

router.delete('/horario/:id',[
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpHorario.deleteHorario);

router.put('/inactivarHorario/:id',[
    // validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
],httpHorario.putHorarioInactivar)
router.put('/activarHorario/:id',[
    // validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
],httpHorario.putHorarioActivar)

export default router