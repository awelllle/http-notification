const request = require('request')
const amqp = require('amqplib')

exports.sendJsonResponse = function (res, status, content) {
  res.status(status).json(content)
}
exports.sendErrorResponse = function (res, content, message, status) {
  status = !status ? 422 : status
  const data = {
    success: false,
    message,
    data: content
  }
  res.status(status).json(data)
}
exports.sendSuccessResponse = function (res, content, message) {
  const data = {
    success: true,
    message,
    data: content
  }
  res.status(200).json(data)
}

exports.generateCode = (l) => {
  const length = l
  const timestamp = Date.now().toString()

  const _getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const parts = timestamp.split('').reverse()
  let id = ''

  for (let i = 0; i < length; ++i) {
    const index = _getRandomInt(0, parts.length - 1)
    id += parts[index]
  }

  return id
}

exports.validParam = (obj, requiredParam) => {
  const objKeys = Object.keys(obj)
  const notFound = []
  let success = true

  requiredParam.forEach((param) => {
    const idx = objKeys.findIndex((k) => {
      return k === param.name
    })

    if (idx < 0) {
      notFound.push(`${param.name} is required`)
      success = false
    } else if (param.type && typeof obj[param.name] !== param.type) {
      notFound.push(`${param.name} should be ${param.type}`)
      success = false
    }
  })

  return {
    success,
    message: notFound
  }
}

exports.sendPostRequest = (data, path) => {
  let response = ''
  const pRequest = request.post(
    {
      url: `${path}`,
      body: data,
      json: true,
      headers: {
        'Content-Type': 'application/json'
      }
    },
    function (error, res, body) {
      if (error) {
        console.log(error)
        error, body
      }
    }
  )

  pRequest.on('data', (data) => {
    response += data
  })

  pRequest.on('end', () => {
    try {
      return null, data
    } catch (e) {
      // todo: log error to sentry
      console.log(e)
    }
    true, data
  })
}

exports.trimCollection = (data) => {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (typeof data[key] === 'string') {
        data[key] = data[key].trim()
      }
    }
  }
  return data
}

exports.queueTask = (channel, data) => {
  const body = JSON.stringify(data)
  const open = amqp.connect(process.env.RABBITMQ)
  open
    .then((conn) => {
      return conn.createChannel()
    })
    .then((ch) => {
      return ch.assertQueue(channel).then(function (ok) {
        ch.sendToQueue(channel, Buffer.from(body))
        console.log(' [x] Sent %s', body)
        return ch.close()
      })
    })
    .catch(console.warn)
}
