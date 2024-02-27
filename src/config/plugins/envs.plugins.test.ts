import { envs } from './envs.plugins';

describe('envs.plugin.ts', () => {

    test('should return env options', () => {

        expect( envs ).toEqual(
            {
                PORT: 3000,
                MAILER_SERVICE: 'gmail',
                MAILER_EMAIL: 'pruebanoc@gmail.com',
                MAILER_SECRET_KEY: 'crmrhxvczjqbnjue',
                PROD: false,
                MONGO_URL: 'mongodb://yvonne:654321@localhost:27017',
                MONGO_DB_NAME: 'NOC-TEST',
                MONGO_USER: 'yvonne',
                MONGO_PASS: '654321'
            }
        )
        
    });

    test('should return error if not found env', async() => { 
        
        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('./envs.plugins');
            expect(true).toBe(false);

        } catch (error) {
            expect(`${error}`).toContain(`"PORT" should be a valid integer`);
        }
    })

})