import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl';
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { EmailService } from './email/email.service';
import { SendEmailLogs } from '../domain/use-cases/mail/send-email-logs';



const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

const emailService = new EmailService();

export class Server {

    public static start() {

        console.log('Server started...');

        // Enviar email por Use Case

        new SendEmailLogs(
            emailService,
            fileSystemLogRepository
        )
        .execute(
            ['luntiromer@gmail.com', 'luntiromer@gmail.com']);

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {

        //         const url = 'https://google.com';
                
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${ url } is ok`),
        //             ( error ) => console.log( error ),
        //         ).execute(url)
        //         // new CheckService().execute('http://localhost:3000');
        //     }
        // );


    }
}