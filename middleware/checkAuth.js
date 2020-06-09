module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token === process.env.token) {
            next();
        } else {

            return res.status(401).json({
                message: 'Auth failed!!'
            })
        }


    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed!!',

        });

    }

};


