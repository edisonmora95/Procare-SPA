const apiAnimadores        = require('./routes/animadores.api.router.js');
const apiBenefactor        = require('./routes/benefactor.api.router');
const apiCalendario        = require('./routes/calendario.api.router');
const apiCargo             = require('./routes/cargo.api.router');
const apiCorreo            = require('./routes/correo.api.router');
const apiDonacion          = require('./routes/donacion.api.router.js');
const apiEtapa             = require('./routes/etapa.api.router');
const apiEventos           = require('./routes/evento.api.router.js');
const apiGrupos            = require('./routes/grupos.api.router');
const apiLogin             = require('./routes/login.api.router');
const apiNinoAccion        = require('./routes/ninoaccion.api.router');
const apiPersonal          = require('./routes/personal.api.router');
const apiProcarianos       = require('./routes/procarianos.api.router');
const apiProcarianosGrupos = require('./routes/procarianogrupo.api.router');
const apiReuniones         = require('./routes/reuniones.api.router');
const apiTareas            = require('./routes/tarea.api.router');
const apiTicket            = require('./routes/ticket.api.router');
const apiTipo              = require('./routes/tipo.api.router');

module.exports = (app) => {
  app.use('/animadores', apiAnimadores);
  app.use('/benefactores', apiBenefactor);
  app.use('/calendario', apiCalendario);
  app.use('/cargo', apiCargo);
  app.use('/correo', apiCorreo);
  app.use('/donacion', apiDonacion);
  app.use('/etapas', apiEtapa);
  app.use('/eventos', apiEventos);
  app.use('/grupos', apiGrupos);
  app.use('/login', apiLogin);
  app.use('/ninos', apiNinoAccion);
  app.use('/personal', apiPersonal);
  app.use('/pg', apiProcarianosGrupos);
  app.use('/procarianos', apiProcarianos);
  app.use('/reuniones', apiReuniones);
  app.use('/tareas', apiTareas);
  app.use('/ticket', apiTicket);
  app.use('/tipo', apiTipo);
}
