import supertest from "supertest";
import mongoose from "mongoose";
import helper from "./testHelper.js";
import app from '../index.js';
import User from '../src/models/User.js';

jest.setTimeout(10000);
const api = supertest(app);
describe('Create new account', () => {
    afterAll(async () => {
        await User.deleteMany({});
    })

    test('signup success', async function() {
        const response = await api.post('/api/user/signup')
                                .send(helper.testUser);
        expect(response.statusCode).toBe(201);
        const {username, displayName} = response.body;
        expect(username).toBe(helper.testUser.username);
        expect(displayName).toBe(helper.testUser.displayName);
    })

    test('returns 400 when trying to sign up with existing username', async() => {
        const response = await api.post('/api/user/signup')
                        .send(helper.testUser);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            message: 'Username already in use'
        })
    })
})

describe('POST /api/user/signin', () => {
    beforeAll(async () => {
        await User.deleteMany({});
        await api.post('/api/user/signup')
                .send(helper.testUser);
    })
    afterAll(async () => {
        await User.deleteMany({});
    })

    test('signin success', async() => {
        const response = await api.post('/api/user/signin')
                    .send({
                        username: helper.testUser.username, 
                        password: helper.testUser.password
                    });
        expect(response.statusCode).toBe(200);
        const {username, displayName} = response.body;
        expect(username).toBe(helper.testUser.username);
        expect(displayName).toBe(helper.testUser.displayName);
    })

    test('signin failure with non-existing username', async() => {
        const response = await api.post('/api/user/signin')
                        .send({
                            username: 'randomUsername', 
                            password: helper.testUser.password
                        });
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
                                message: 'User not exist',
                                status: 400                            
                            });
    })

    test('signin failure with wrong password', async() => {
        const response = await api.post('/api/user/signin')
                            .send({
                                username: helper.testUser.username,
                                password: 'randomUsername'
                            });
        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual({
                                        message: 'Unauthorized',
                                        status: 401 
                                    });
    })
})

afterAll(async() => {
    await mongoose.connection.close();
})