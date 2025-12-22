# Project summary

- Purpose: Backend for a livestock & farm management system (Express + TypeScript, MongoDB + TypeORM/Postgres).
- Entrypoint: `src/server.ts` — starts the app and instantiates the `Server` class.
- DB / data sources:
  - MongoDB + Mongoose models (examples: `src/Models/inventory.Model.ts`, `src/Models/animals.ts`, `src/Models/breed.ts`).
  - TypeORM / Postgres: `src/data-source.ts` (`AppDataSource`, `PostgresDataSource`).
- Core classes / services:
  - Auth: `src/Classes/auth.Class.ts`, controller `src/Controller/auth.Controller.ts`, routes `src/Routes/auth.Routes.ts`.
  - Users: `src/Classes/user.Class.ts`, entity `src/entity/user.Entity.ts`, controller `src/Controller/user.Controller.ts`, routes `src/Routes/user.Routes.ts`.
  - Roles & Permissions: classes in `src/Classes`, entities `src/entity/role.Entity.ts`, `src/entity/permissions.Entity.ts`, routes `src/Routes/role.Routes.ts`, `src/Routes/permission.Routes.ts`.
  - Inventory: `src/Classes/inventory.Class.ts`, model `src/Models/inventory.Model.ts`, controller `src/Controller/inventory.Controller.ts`, routes `src/Routes/inventory.Route.ts`.
  - Livestock / Crop / Farm: classes/controllers in `src/Classes` and routes in `src/Routes` (e.g. livestock, crop, farm).
- Shared utilities:
  - Error handling: `src/Classes/error.class.ts`.
  - Validators / middleware: `src/Validators/auth.validator.ts`, `src/Middleware/auth.Middleware.ts`.
  - Formatters: `src/Formatters/money.Formatter.ts`.
- Seed & defaults: `src/Config/seed.ts`, `src/Config/defaultData.ts`.
- Build / tooling: `package.json`, `tsconfig.json`, `Dockerfile`.

Key entrypoints to inspect: `src/Classes/server.class.ts`, `src/data-source.ts` (AppDataSource), `src/Classes/auth.Class.ts`, `src/Classes/user.Class.ts`, `src/Classes/role.Class.ts`, `src/Classes/inventory.Class.ts`.
