import express, { json } from 'express'
import { database } from './database'
import { redisClient } from './services/redis'
import router from './routers'

export async function initialApp() {
  const app = express()

  await database.initialize()
  await redisClient.connect()

  app.use(json())
  app.use(router)

  return app
}
