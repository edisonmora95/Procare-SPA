'use strict';

process.env.NODE_ENV = 'test';

const { serverApp }   = require('../../../app')
const { app, server } = serverApp()

const chai 		= require('chai');
const request = require('supertest');
const expect 	= chai.expect;

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJQZXJzb25hbCJdLCJpZCI6MiwiaWF0IjoxNTI3NDYzMTc5LCJleHAiOjE1MjgwNjc5Nzl9.vZIpehBPISJ1UCrTfGM4huOMIrTFA-ZCtAd3JqRlNHM"

describe('CALENDARIO', () => {

	describe('mostrarCalendario', () => {
		it('CP1. Búsqueda exitosa', function(done) {

	    request(app)
	    	.get('/api/calendario/')
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Búsqueda exitosa');
					expect(res.body.datos).to.be.an('array');
					done();
				});
		});
	});

	describe('mostrarCalendarioUsuario', () => {
		it('CP1. Búsqueda exitosa', function(done) {

	    request(app)
	    	.get('/api/calendario/usuario/4')
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Búsqueda exitosa');
					expect(res.body.datos).to.be.an('array');
					done();
				});
		});

		it('CP2. Usuario sin tareas', function(done) {

	    request(app)
	    	.get('/api/calendario/usuario/1')
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Búsqueda exitosa');
					expect(res.body.datos).to.be.an('array');
					done();
				});
		});

		it('CP3. Usuario no existente', function(done) {

	    request(app)
	    	.get('/api/calendario/usuario/1000')
	    	.set('x-access-token', token)
				.end( (err, res) => {
					expect(res.body.estado).to.equal(true);
					expect(res.body.mensaje).to.equal('Búsqueda exitosa');
					expect(res.body.datos).to.be.an('array');
					done();
				});
		});

	});

});
