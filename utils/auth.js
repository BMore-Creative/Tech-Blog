const { User } = require('../models')

const forceLogin = async (req, res, next) => {

    if(!req.session.logged_in) {
        res.redirect('/login')

        return next()
    }

    return next()
}

const authenticate = async (req, res, next) => {
    if(req.session.logged_in) {
        const user = await User.findByPk(req.session.user_id, {
            attributes: {
                exclude: ['password'],
            },
        })

        req.user = user.get({ plain: true })

        return next();
    } else {
        req.user = null;

        return next();
    }
}

module.exports = { forceLogin, authenticate }