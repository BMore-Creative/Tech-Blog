const { User } = require('../models')
const isLoggedIn = req.session.logged_in

const forceLogin = async (req, res, next) => {

    if(!isLoggedIn) {
        res.redirect('/login')

        return next()
    }

    return next()
}

const authenticate = async (req, res, next) => {
    if(isLoggedIn) {
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