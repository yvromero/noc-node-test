import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugins";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";


(async() => {
    main();
})();

async function main(){
    
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    // const prisma = new PrismaClient();
    // Crear registros en Postgres
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test message',
    //         origin: 'app.ts'
    //     }
    // });

    // console.log({newLog});

     // Leer registros de Postgres
    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: "LOW"
    //     }
    // })

    // console.log(logs);


    // Crear registros en Mongo

    // const newLog = await LogModel.create({
    //     message: 'Test message desde mongo',
    //     origin: 'app.ts',
    //     level: 'low'
    // });

    // await newLog.save();

    // Entradas - Obtener registros
    // const logs = await LogModel.find();
    // console.log(logs[1].level);

    Server.start();
}