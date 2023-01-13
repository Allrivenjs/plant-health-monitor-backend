### Setup
To run the app locally, the datebase has to be setup
>setup docker database: \
`docker compose up -d`

>Generate new migrations: \
`yarn typeorm migration:generate ./src/migrations -d ./src/data-source.ts`

>Exec migrations: \
`yarn typeorm migration:run -d ./src/data-source.ts`

>Init server project: \
`yarn start`
 
