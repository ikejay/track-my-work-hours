import cors from "cors"
import express from "express"
import { appRoutes } from "./routes"

export class BackendApp {
  private readonly _app = express()

  constructor() {
    this.setUpMiddleware()
  }

  get app() {
    return this._app
  }

  async init() {
    this.initializeRoutes()
  }

  private setUpMiddleware() {
    const corsOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    }

    this._app
      .use(cors(corsOptions))
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
  }

  private initializeRoutes() {
    this._app.use("/api", appRoutes)
  }
}
