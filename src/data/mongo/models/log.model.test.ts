import mongoose from "mongoose";
import { MongoDatabase } from "../init";
import { envs } from "../../../config/plugins/envs.plugins";
import { LogModel } from "./log.model";


describe('log.model.test.ts', () => {
    
    // Limpiar los residuos, evita el warning A worker process has failed...
    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        })
    })

    // Limpiar los residuos, evita el warning A worker process has failed...
    afterAll(() => {
        mongoose.connection.close();
    })

    test('should return logModel', async () => { 

        const logData = {
            origin: 'log.model.test.ts',
            message: 'test-message',
            level: 'low'
        }

        const log = await LogModel.create( logData );

        expect( log ).toEqual( expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String),
        }))

        // Limpiar los registros en la BD - Se debe borrar
        await LogModel.findByIdAndDelete( log.id );

    });

    test('should return the schema object', () => { 

        const schema = LogModel.schema.obj;

        expect( schema ).toEqual( expect.objectContaining(
            {
                message: { type: expect.any(Function), required: true },
                origin: { type: expect.any(Function) },
                level: {
                    type: expect.any(Function),
                    enum: [ 'low', 'medium', 'high' ],
                    default: 'low'
                },
                createdAt: expect.any(Object)
            }
        ))
    })
});