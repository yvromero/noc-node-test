import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe('init MongoDB', () => {
    // Limpiar los residuos, evita el warning A worker process has failed...
    afterAll(() => {
        mongoose.connection.close();
    })

    test('should connect to MongoDB', async() => {

        // console.log(process.env.MONGO_URL, process.env.MONGO_DB_NAME);

        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!,
        })

        expect(connected).toBe(true);
    });

    test('should throw an error', async() => {

        try {
            const connected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: 'mongodb://yvonne:6541121@localhost:27017'
            });
            expect(true).toBe(false);         
        } catch (error) {
        
        }
    });
})