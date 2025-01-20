import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { readFileSync } from 'node:fs'

import session from 'express-session'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import passport from 'passport'
import { PrismaClient } from '@prisma/client'
import logger from './logger/Logger'
import resolvers from './graphql/resolvers'
import prisma from './lib/prisma'
import { GraphQLContext } from './types'
import authRouter from './routes/auth.routes'

const typeDefs = readFileSync('./src/graphql/schema.graphql', 'utf8')
const app = express()

const result = dotenv.config()

if (result.error) {
  throw result.error
}

const httpServer = http.createServer(app)
// Add user session to db
app.use(
  session({
    cookie: {
      maxAge: 21 * 24 * 60 * 60 * 1000, // 21 days
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
)

// Initialize passport
app.use(passport.initialize())
app.use(passport.session())

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  const PORT = process.env.PORT || 4001

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: ['*'],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<GraphQLContext> => ({
        prisma,
        req,
        res,
      }),
    })
  )
  app.use('/', authRouter)
  /* eslint-disable no-promise-executor-return */
  await new Promise<void>(resolve =>
    httpServer.listen({ port: PORT }, () => {
      resolve()
    })
  )
  /* eslint-enable no-promise-executor-return */
  logger.info(`🚀 Server serving at http://localhost:${PORT}/graphql`)
}

startApolloServer().catch(err => logger.error(err))
