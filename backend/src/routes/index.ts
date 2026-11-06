import { Router, Request, Response } from "express"

const healthCheck = (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    message: "Server is running",
  })
}

export const appRoutes = Router().get("/health", healthCheck)
