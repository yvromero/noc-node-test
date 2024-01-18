import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { EmailService } from './email/email.service';
import { SendEmailLogs } from '../domain/use-cases/mail/send-email-logs';
import { CronService } from './cron/cron-service';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { MongoLogDatasource } from '../infraestructure/datasources/mongo-log.datasource';
import { LogSeverityLevel } from '../domain/entities/log.entity';
import { PostgresLogDatasource } from '../infraestructure/datasources/postgres-log.datasource';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';


// Un solo repo
// const LogRepository = new LogRepositoryImpl(
//     //new FileSystemDatasource()
//     // new MongoLogDatasource()
//     new PostgresLogDatasource()
// );

// Usar multiples repositorios
const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
);



const emailService = new EmailService();

export class Server {

    public static async start() {

        console.log('Server started...');

        // Enviar email por Use Case
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // )
        // .execute(
        //     ['luntiromer@gmail.com', 'luntiromer@gmail.com']);

        // const logs = await LogRepository.getLogs(LogSeverityLevel.low);
        // console.log(logs);

        
        CronService.createJob(
            '*/5 * * * * *',
            () => {

                const url = 'https://google.com';

                // Usar multiples repositorios
                new CheckServiceMultiple(
                    [ fsLogRepository, mongoLogRepository, postgresLogRepository ],
                    () => console.log(`${ url } is ok`),
                    ( error ) => console.log( error ),
                ).execute(url)

                // Un solo repositorio
                // new CheckService(
                //     LogRepository,
                //     () => console.log(`${ url } is ok`),
                //     ( error ) => console.log( error ),
                // ).execute(url)
            }
        );


    }
}