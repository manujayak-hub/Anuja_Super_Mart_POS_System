import pino from "pino"

const logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime:'SYS:HH:MM:ss',
        ignore:'pid,hostname'
      }
    },
  })

  export {logger}