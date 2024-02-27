# Project NOC

Create a monitoring app with a set of tasks using Clean Architecture with TypeScript.

# dev
1. Create a .env.template file and rename it to .env.
2. Configure the environment variables.

```
PORT=
MAILER_SERVICE=
MAILER_EMAIL=
MAILER_SECRET_KEY=
PROD=

MONGO_URL=
MONGO_DB_NAME=
MONGO_USER=
MONGO_PASS=
```

3. Execute ```npm install```
4. Start the databases and execute the command ```docker compose up -d```
5. Execute ```npx prisma migrate dev --name init```
6. Execute ```npm run dev```

## Get Gmail Key