const { readFileSync, writeFileSync } = require('fs')
const { graphqlToOpenApi } = require('graphql-to-swagger')

const schema = readFileSync('./src/graphql/schema.graphql', 'utf-8')

const openApiSpec = graphqlToOpenApi(schema)

writeFileSync('openapi.json', JSON.stringify(openApiSpec, null, 2))
