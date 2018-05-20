'use strict';
process.env.NODE_ENV = 'test';

const chai = require('chai');

const assert = chai.assert;
const should = chai.should();

const sequelize 	= require('../../models/').sequelize;
const ModeloTarea = require('../../models/').Tarea;

describe('TAREAS', () => {
	describe('crearTareaP', () => {
		let tarea = {
			nombre 					 : 'Prueba',
			fechaPublicacion : new Date(),
			fechaInicio 		 : new Date(),
			fechaFin 				 : new Date(),
			prioridad 			 : 1,
			estado 					 : 1,
			descripcion 		 : 'Tarea de prueba para hacer tests unitarios',
			categoria 			 : 1,
			tipo 						 : 'tarea',
			idResponsable    : 4
		};
		afterEach( () => {
			tarea = {
				nombre 					 : 'Prueba',
				fechaPublicacion : new Date(),
				fechaInicio 		 : new Date(),
				fechaFin 				 : new Date(),
				prioridad 			 : 1,
				estado 					 : 1,
				descripcion 		 : 'Tarea de prueba para hacer tests unitarios',
				categoria 			 : 1,
				tipo 						 : 'tarea',
				idResponsable    : 4
			};
		});

		it('CP1. Creación exitosa', done => {
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				resultado.should.be.a('object')
				assert.equal(resultado.get('nombre'), tarea.nombre, 'Nombre creado incorrecto');
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});

		it('CP2. Nombre vacío', done => {
			tarea.nombre = '';
			ModeloTarea.crearTareaP(tarea)
			.then( res => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Nombre" no puede estar vacío', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP3. Nombre con caracteres especiales', done => {
			tarea.nombre = '<>';
			ModeloTarea.crearTareaP(tarea)
			.then( res => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Nombre"', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP4. Nombre es null', done => {
			tarea.nombre = null;
			ModeloTarea.crearTareaP(tarea)
			.then( res => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Tarea.nombre cannot be null', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP5. Fecha de publicación está vacía', done => {
			tarea.fechaPublicacion = '';
			ModeloTarea.crearTareaP(tarea)
			.then( res => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Fecha de publicación" no puede estar vacío', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP6. Fecha de publicación futura', done => {
			const today  = new Date();
			let tomorrow = new Date();
			tomorrow.setDate(today.getDate() + 1);
			tarea.fechaPublicacion = tomorrow;

			ModeloTarea.crearTareaP(tarea)
			.then( res => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar una fecha de publicación futura', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP7. fechaPublicacion de publicación null', done => {
			tarea.fechaPublicacion = null;

			ModeloTarea.crearTareaP(tarea)
			.then( res => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Tarea.fechaPublicacion cannot be null', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP8. Fecha de inicio vacía', done => {
			tarea.fechaInicio = '';
			ModeloTarea.crearTareaP(tarea)
			.then( res => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Fecha de inicio" no puede estar vacío', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP9. Fecha de inicio pasada', done => {
			const today   = new Date();
			let yesterday = new Date();
			yesterday.setDate(today.getDate() - 1);
			tarea.fechaInicio = yesterday;

			ModeloTarea.crearTareaP(tarea)
			.then( res => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar una fecha de inicio que ya pasó', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP10. Fecha de inicio null', done => {
			tarea.fechaInicio = null;

			ModeloTarea.crearTareaP(tarea)
			.then( res => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Tarea.fechaInicio cannot be null', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP11. Fecha fin null', done => {
			tarea.fechaFin = null;

			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				resultado.should.be.a('object')
				assert.equal(resultado.get('fechaFin'), null, 'Fecha fin ingresada incorrecta');
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});

		it('CP12. Fecha fin pasada', done => {
			const today   = new Date();
			let yesterday = new Date();
			yesterday.setDate(today.getDate() - 1);
			tarea.fechaFin = yesterday;

			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar una fecha fin que ya pasó', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP13. Prioridad vacía', done => {
			tarea.prioridad = '';
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Prioridad" no puede estar vacío', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP14. Prioridad no es número', done => {
			tarea.prioridad = 'holaaaa';
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Prioridad" debe ser número', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP15. Prioridad es un número inválido', done => {
			tarea.prioridad = 10;
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Prioridad" debe ser 1, 2 ó 3', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP16. Prioridad null', done => {
			tarea.prioridad = null;
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Tarea.prioridad cannot be null', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP17. Estado vacío', done => {
			tarea.estado = '';
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Estado" no puede estar vacío', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP18. Estado no es número', done => {
			tarea.estado = 'holaaaa';
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Estado" debe ser número', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP19. Estado es un número inválido', done => {
			tarea.estado = 10;
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Estado" debe ser 1, 2 ó 3', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP20. Estado null', done => {
			tarea.estado = null;
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Tarea.estado cannot be null', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP21. Descripción vacía', done => {
			tarea.descripcion = '';
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Descripción" no puede estar vacío', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP22. Descripción con caracteres especiales', done => {
			tarea.descripcion = '<>';
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No puede ingresar caracteres especiales en "Descripción"', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP23. Descripción null', done => {
			tarea.descripcion = null;
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Tarea.descripcion cannot be null', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP24. Categoría vacía', done => {
			tarea.categoria = '';
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Categoría" no puede estar vacío', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP25. Categoría no es número', done => {
			tarea.categoria = 'holaaaa';
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Categoría" debe ser número', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP26. Categoría es un número inválido', done => {
			tarea.categoria = 10;
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Categoría" debe ser 1, 2 ó 3', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP27. Categoría null', done => {
			tarea.categoria = null;
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Tarea.categoria cannot be null', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP28. Id del responsable no enviado', done => {
			tarea.idResponsable = null;
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje,  'Debe enviar el id del responsable', 'Mensaje obtenido incorrecto');
				done();
			});
		});

		it('CP29. Id del responsable negativo', done => {
			tarea.idResponsable = -5;
			ModeloTarea.crearTareaP(tarea)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				fail.should.be.a('object')
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje,  'El id del responsable debe ser mayor a 0', 'Mensaje obtenido incorrecto');
				done();
			});
		});
	});

	describe('obtenerTodasLasTareasP', () => {
		it('CP1. Caso exitoso', done => {
			ModeloTarea.obtenerTodasLasTareasP()
			.then( resultado => {
				resultado.should.be.a('array')
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});
	});

	describe('obtenerTareasDeUsuarioP', () => {
		let idResponsable = 4;
		it('CP1. Caso exitoso', done => {
			ModeloTarea.obtenerTareasDeUsuarioP(idResponsable)
			.then( resultado => {
				resultado.should.be.a('array')
				assert.equal(resultado[0].get('idResponsable'), idResponsable, 'Responsables no coinciden');
				done();
			})
			.catch( fail => {
				done(fail);
			});
		});

		it('CP2. idResponsable es null', done => {
			ModeloTarea.obtenerTareasDeUsuarioP(null)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Debe enviar el id del responsable', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP3. idResponsable es negativo', done => {
			ModeloTarea.obtenerTareasDeUsuarioP(-5)
			.then( resultado => {
				done();
			})
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El id del responsable debe ser mayor a 0', 'Mensaje de error incorrecto');
				done();
			});
		});
	});

	describe('eliminarTareaT', () => {
		let transaction;
		let idTarea = 1;

		beforeEach( () => {
			return inicializarTransaccion()
			.then( t => {
				transaction = t;
			})
			.catch( fail => {
				console.log(fail);
			});
		});

		it('CP1. Eliminación exitosa', done => {
			ModeloTarea.eliminarTareaT(idTarea, transaction)
			.then( resultado => {
				transaction.rollback();
				assert.equal(resultado, 1, 'Cantidad eliminada incorrecta');
				done();
			})
			.catch( fail => {
				transaction.rollback();
				done(fail);
			});
		});

		it('CP2. Id es null', done => {
			ModeloTarea.eliminarTareaT(null, transaction)
			.then( resultado => {
				transaction.rollback();
				done();
			})
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Debe enviar el id de la tarea', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP3. Id de tarea inválido', done => {
			ModeloTarea.eliminarTareaT(-5, transaction)
			.then( resultado => {
				transaction.rollback();
				done();
			})
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El id de la tarea debe ser mayor a 0', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP4. Id de tarea inválido', done => {
			ModeloTarea.eliminarTareaT(500, transaction)
			.then( resultado => {
				transaction.rollback();
				done();
			})
			.catch( fail => {
				transaction.rollback();
				assert.equal(fail.tipo, 'Delete error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'No se encontró tarea con el id indicado', 'Mensaje de error incorrecto');
				done();
			});
		});
	});

	describe('cambiarEstadoP', () => {
		let estadoNuevo = 2;
		let idTarea     = 1;

		it('CP1. Cambio exitoso', done => {
			ModeloTarea.cambiarEstadoP(idTarea, estadoNuevo)
			.then( resultado => {
				assert.equal(resultado, 1, 'Cantidad de registros incorrecta');
				done();
			});
		});

		it('CP2. idTarea es null', done => {
			ModeloTarea.cambiarEstadoP(null, estadoNuevo)
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Debe enviar el id de la tarea', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP3. idTarea es negativo', done => {
			ModeloTarea.cambiarEstadoP(-5, estadoNuevo)
			.catch( fail => {
				assert.equal(fail.tipo, 'Foreign key constraint error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El id de la tarea debe ser mayor a 0', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP4. Estado no enviado', done => {
			ModeloTarea.cambiarEstadoP(idTarea, null)
			.catch( fail => {
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'Tarea.estado cannot be null', 'Mensaje de error incorrecto');
				done();
			});
		});

		it('CP5. Estado inválido', done => {
			ModeloTarea.cambiarEstadoP(idTarea, 5)
			.catch( fail => {
				assert.equal(fail.tipo, 'Validation error', 'Tipo de error incorrecto');
				assert.equal(fail.mensaje, 'El campo "Estado" debe ser 1, 2 ó 3', 'Mensaje de error incorrecto');
				done();
			});
		});
	});

});

function inicializarTransaccion(){
	return new Promise( (resolve, reject) => {
		sequelize.transaction({
			autocommit: false,
		})
		.then( result => {
			return resolve(result);
		})
		.catch( fail => {
			return reject(fail);
		});
	});
}
