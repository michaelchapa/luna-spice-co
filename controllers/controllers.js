const saySomething = (req, res, next) => {
    res.status(200).json({
        body: 'Hello from the server!'
    });
};

const somethingElse = (req, res, next) => {
    res.status(200).json({
        head: 'This the head bro',
        body: 'body ody ody ody ody ody ody',
        foot: 'feetz'
    });
}

module.exports.saySomething = saySomething;
module.exports.somethingElse = somethingElse; 