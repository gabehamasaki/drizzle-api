const logger = {
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: true,
      ignore: 'pid,hostname,reqId,responseTime,res,req',
      messageFormat: '{if req.method}{req.method} - {end} {if req.url} {req.url} - {end} {if res.statusCode} StatusCode: {res.statusCode} - {end}{msg}'
    }
  },
}

export default logger;