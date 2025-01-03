import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { readFileSync } from 'node:fs'
import resolvers from './graphql/resolvers'
import logger from './logger/Logger'

const typeDefs = readFileSync('./src/graphql/schema.graphql', 'utf8')
const server = new ApolloServer({
  typeDefs,
  resolvers
})

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  })
  logger.info(`Server ready at ${url}`)
}

startServer()
