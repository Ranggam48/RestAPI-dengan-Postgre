const { application } = require('express');
const app = require('../app');
const request = require('supertest');

const admin = {
    name: 'tes',
    username: 'tes',
    email: 'tes',
    password: '123',
    isAdmin: true,
    noPhone: 123
}


describe('Admin routes', () => {
    it('POST /admin', async () => {
        const res = await request(app)
        .post('/admin/register')
        .send(admin)
        .set('Accept', 'application/json');

        expect(res.status).toBe(200);
        expect(typeof res.body.message).toMatch('string');
    })
})