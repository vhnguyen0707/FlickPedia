import mongoose from "mongoose";
import supertest from "supertest"; 
import app from '../index.js';
import helper from './testHelper.js';
import tmdbApi from "../src/tmdb/tmdb.api.js";

const api = supertest(app); // to make http requests to routes

describe('GET /api/:mediaType/:mediaCategory', () => {
    const mediaList = tmdbApi.mediaList;
    afterAll(() => {
        tmdbApi.mediaList = mediaList;
    })
    test('should return a list of media items', async () => {
        tmdbApi.mediaList = jest.fn().mockResolvedValue(helper.mockResolvedValue);
        const response = await api.get('/api/movie/popular')
                                .query({ page: 1 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(helper.mockResolvedValue);
    })

    test('should handle errors and return an error response', async() => {
        tmdbApi.mediaList = jest.fn().mockRejectedValue(new Error('API error'));

        const response = await api.get('/api/movie/popular')
                                .query({ page: 1 });
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({
                status: 500,
                message: 'Server Error'});
    })
})

describe('GET /api/:mediaType/detail/:mediaId', () => {
    const getDetail = tmdbApi.getDetail;
    afterAll(() => {
        tmdbApi.getDetail = getDetail;
    })
    test('should return media\'s detail with success code', async() => {
        tmdbApi.getDetail = jest.fn().mockResolvedValue(helper.mockResolvedValue);
        const response = await api.get('/api/tv/detail/14981');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(helper.mockResolvedValue);
    })
    test('should handle errors and return an error response', async() => {
        tmdbApi.getDetail = jest.fn().mockRejectedValue(new Error('API error'));

        const response = await api.get('/api/tv/detail/14981');
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({
                status: 500,
                message: 'Server Error'});
    })
})

afterAll(async() => {
    mongoose.connection.close();
})