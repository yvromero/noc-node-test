import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from './email.service';


describe('EmailService', () => {

    const mockSendMail = jest.fn();
    
    // Mock al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });

    const emailService = new EmailService();

    test('should send email', async() => {

        const options: SendMailOptions = {
            to: 'luntiromer@gmail.com',
            subject: 'Test Send Email',
            htmlBody: '<h1>Test</h1>'
        }

        await emailService.sendEmail( options );

        expect( mockSendMail ).toHaveBeenCalledWith({

        "attachments": expect.any( Array ),
        "html": "<h1>Test</h1>",
        "subject": "Test Send Email",
        "to": "luntiromer@gmail.com",
    
        });
    })

    test('should send email with attachments', async() => {

        const email = 'luntiromer@gmail.com';
        await emailService.sendEmailWithLogs( email );

        expect( mockSendMail ).toHaveBeenCalledWith({
            to: email, 
            subject: "Logs de monitoreo",
            html: expect.any( String ),
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-high.log', path: './logs/logs-high.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
            ])
        });
    })

})