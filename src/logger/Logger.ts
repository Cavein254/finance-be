import pino from 'pino'

const transport = pino.transport({
  targets: [
    {
      target: 'pino-pretty',
      options: {
        destination: './logs/output.log',
        mkdir: true,
        colorize: false,
      },
    },
    {
      target: 'pino-pretty',
      options: {
        destination: process.stdout.fd,
        colorize: true,
      },
    },
  ],
})

const logger = pino(
  {
    level: 'info',
  },
  transport
)

export default logger
