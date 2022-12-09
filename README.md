### Setup
To run the app locally, the datebase has to be setup
>Exec migrations: \
`docker compose up -d`

>Exec migrations: \
`yarn typeorm -- migration:run -d ./src/data-source.ts`

>Init server project: \
`yarn start`
