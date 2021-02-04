const charge = (req, res, next) => {
    res.status(200).json({
        head: 'This the head bro',
        body: 'body ody ody ody ody ody ody',
        foot: 'feetz'
    });
}

module.exports.charge = charge;
// module.exports.somethingElse = somethingElse; 