const {validParam, sendErrorResponse, sendSuccessResponse, trimCollection} = require('../helpers/utility');
const mongoose = require('mongoose');
const Sub = mongoose.model('Subscription');


exports.subscribe = (req, res) =>{

    let required = [
        {name: 'url', type: 'string'},
        
    ];
    let hasRequired = validParam(req.body, required);
    if (hasRequired.success) {

        const {topic} = req.params

            req.body = trimCollection(req.body);
            const body = req.body;

            let nSub             = new Sub();
            
            nSub.topic       = topic;
            nSub.url        = body.url
        
        
                nSub.save((err) => {
                   
                    if (err) {
                        console.log(err);
                        return sendErrorResponse(res, {err}, 'Something went wrong');
                    }
                    return sendSuccessResponse(res, {url: body.url, topic: topic,}, '');
 });
    
    
}else{
    return sendErrorResponse(res, {required: hasRequired.message}, 'Missing required fields');
}

}



exports.publish = (req, res) =>{

    const {topic} = req.params

    Sub.findOne({topic: topic}, function (err, result) {
        if (err) {
            return sendErrorResponse(res, {err}, 'Something went wrong');
        }
       
            console.log(result, "result")
        
        });

}


