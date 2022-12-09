### Setup
To run the app locally, the datebase has to be setup
>setup docker database: \
`docker compose up -d`

>Exec migrations: \
`yarn typeorm -- migration:run -d ./src/data-source.ts`

>Init server project: \
`yarn start`
