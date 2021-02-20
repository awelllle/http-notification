const mongoose = require('mongoose')
const {
  validParam,
  sendErrorResponse,
  sendSuccessResponse,
  trimCollection,
  queueTask
} = require('../helpers/utility')

const Sub = mongoose.model('Subscription')

exports.subscribe = (req, res) => {
  const required = [{ name: 'url', type: 'string' }]
  const hasRequired = validParam(req.body, required)
  if (hasRequired.success) {
    const { topic } = req.params

    req.body = trimCollection(req.body)
    const { body } = req

    const nSub = new Sub()

    nSub.topic = topic
    nSub.url = body.url

    nSub.save((err) => {
      if (err) {
        console.log(err)
        return sendErrorResponse(res, { err }, 'Something went wrong')
      }
      return sendSuccessResponse(res, { url: body.url, topic }, '')
    })
  } else {
    return sendErrorResponse(
      res,
      { required: hasRequired.message },
      'Missing required fields'
    )
  }
}

exports.publish = (req, res) => {
  const { topic } = req.params

  Sub.findOne({ topic }, function (err, result) {
    if (err) {
      return sendErrorResponse(res, { err }, 'Something went wrong')
    }
    const payload = {
      topic: result.topic,
      url: result.url,
      data: req.body
    }
    queueTask('pubs', payload)
    return sendSuccessResponse(res, {}, 'Publish was successful!')
  })
}
