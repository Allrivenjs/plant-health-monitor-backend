### Setup
To run the app locally, the datebase has to be setup
>setup docker database: \
`docker compose up -d`

>Generate new migrations (no used for init project): \
`yarn typeorm migration:generate -d ./src/data-source.ts -n GardenRefactoring`

>Exec migrations: \
`yarn typeorm -- migration:run -d ./src/data-source.ts`

>Init server project: \
`yarn start`
 