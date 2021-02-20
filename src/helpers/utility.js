
const request = require('request');
var amqp = require('amqplib');

exports.sendJsonResponse = function (res, status, content) {
    res.status(status).json(content);
};
exports.sendErrorResponse = function (res, content, message, status) {
    status = !status ? 422 : status
    let data = {
        success: false,
        message: message,
        data: content
    };
    res.status(status).json(data);
};
exports.sendSuccessResponse = function (res, content, message) {
    let data = {
        success: true,
        message: message,
        data: content
    };
    res.status(200).json(data);
};



exports.generateCode = (l) => {

    const length = l;
    let timestamp = Date.now().toString();

    let _getRandomInt = function( min, max ) {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    };

    let parts = timestamp.split( "" ).reverse();
    let id = "";

    for( let i = 0; i < length; ++i ) {
        const index = _getRandomInt( 0, parts.length - 1 );
        id += parts[index];
    }

    return id;
};


exports.validParam = (obj, requiredParam) => {
    let objKeys = Object.keys(obj);
    let notFound = [];
    let success = true;

    requiredParam.forEach((param, index) => {
        let idx = objKeys.findIndex(k => {
            return k === param.name;
        });

        if (idx < 0) {
            notFound.push(`${param.name} is required`);
            success = false;
        } else if (param.type && (typeof obj[param.name] != param.type)) {
            notFound.push(`${param.name} should be ${param.type}`);
            success = false;
        }
    });

    return {
        success: success,
        message: notFound
    };
};

exports.sendPostRequest = (data, path) => {

    let response = '';

    let pRequest = request.post({
        url: `${path}`,
        body: data,
        json: true,
        headers: {
            'Content-Type': 'application/json',
           
        }

    }, function(error, res, body){
        if(error){
            console.log(error);
            (error, body);
        }
    });

    pRequest.on('data', (data) => {
        response += data;
    });

    pRequest.on('end', () => {
        try {
            let data = JSON.parse(response);
            console.log(data);
            if (data.success) {
                return (null, data);
            }
        } catch (e) {
            //todo: log error to sentry
            console.log(e);
        }
        (true, data);
    });
};


exports.trimCollection = (data) => {
    for(let key in data){
        if(data.hasOwnProperty(key)){
            if(typeof data[key] == "string"){
                data[key] = data[key].trim();
            }
        }
    }
    return data;
};




exports.queueTask = (channel, data) => {
    let body = JSON.stringify(data);
    const open = amqp.connect(process.env.RABBITMQ);
    open.then((conn) => {
        return conn.createChannel();
    }).then((ch) => {

    return ch.assertQueue(channel).then(function(ok) {
        ch.sendToQueue(channel, Buffer.from(body));
        console.log(" [x] Sent %s", body);
        return ch.close();
    });

    }).catch(console.warn);
   

};

