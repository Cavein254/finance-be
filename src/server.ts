import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { readFileSync } from 'node:fs'
import resolvers from './graphql/resolvers'
import logger from './logger/Logger'

const typeDefs = readFileSync('./src/graphql/schema.graphql', 'utf8')
const app = express()
const httpServer = http.createServer(app)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start()

const PORT = 4001

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
)

await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve))

logger.info(`🚀 Server serving at http://localhost:${PORT}/graphql`)
