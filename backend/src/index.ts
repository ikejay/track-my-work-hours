import { BackendApp } from "./app"
;(async () => {
  const port = Number(process.env.PORT ?? 3000)
  const backend = new BackendApp()

  await backend.init()

  const server = backend.app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(`Health check: http://localhost:${port}/api/health`)
  })

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("Server closed")
      process.exit(0)
    })
  })

  process.off("SIGINT", () => {
    server.close(() => {
      console.log("Server closed")
      process.exit(0)
    })
  })
})()
