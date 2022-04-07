const config = require('../config/config')
const redisRefreshToken = require('../redis/redis')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.getByUsername(username)
        if (user != null){
            const salt = user['salt']
            let hashedPassword = await bcrypt.hash(password, salt)
            if (hashedPassword === user['password']){

                // poprzez sha256 = id_usera + secret do refresha = sha256 => zapisywane w redisie
                // masz metode refreshToken na backendzie ktora odswieza token - ona jest wywolywana w momencie kiedy access jest niewazny albo go nie ma wcale, jestli jest wazny to metoda refreshToken jest wywolywana a w przypadku kiedy nie ma accesa ta metoda sprawdza czy refresh_token z ciastek znajduje sie w redisie, jesli nie to wywala 401, jesli tak to zwraca ci userId 

                const { accessToken, refreshToken } = await User.generateTokenPairs(username)
                redisRefreshToken.set(refreshToken, username)

                res.cookie('access_token', accessToken, {
                    expires: new Date(Date.now() + 60)
                })

                res.cookie('refresh_token', refreshToken, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 604800000)
                })

                return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken})
            }else{
                return res.status(401).json({message: 'Wrong password'})
            }
        }else{
            res.status(401).json({message: 'User doesnt exists'})
        }
    } catch(e){
        console.log(e)
        return res.status(500).json({message: 'Something went wrong from backend'})
    }
}

exports.logout = async (req, res, next) => {
    const refreshToken = await req.cookies['refresh_token']
    await redisRefreshToken.del(refreshToken)
    res.clearCookie('access_token')
    res.clearCookie('refresh_token')
    return res.status(200).json({message: "User is log out"})
}

exports.refreshToken = async (req, res, next) => {
    const refreshTokenCookie = req.cookies['refresh_token']

    if(!refreshTokenCookie){
        return res.status(400).json({message: 'A token is required'})
    }

    const username = await User.getByRefreshToken(refreshTokenCookie)

    if(!username){
        return res.status(401).json({message: 'Unauthorized'})
    }

    const { accessToken, refreshToken } = await User.generateTokenPairs(username)
    redisRefreshToken.del(refreshTokenCookie)
    redisRefreshToken.set(refreshToken, username)

    res.cookie('access_token', accessToken, {
        expires: new Date(Date.now() + 300000)
    })
    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 604800000)
    })

    return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken})
}

exports.authToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(400).json({message: 'A token is required for authentication'})
    const decoded = jwt.verify(token, config.access_token_secret, (err, user) => {
        if (err) return res.status(401).json({message: 'Invalid token'})
        req.user = user
        next()
    })
}

exports.authMe = async (req, res, next) => {
    const refreshTokenCookie = req.cookies['refresh_token']
    if(!refreshTokenCookie){
        return res.status(400).json({message: 'A token is required'})
    }
    const username = await User.getByRefreshToken(refreshTokenCookie)
    if(!username){
        console.dir(refreshTokenCookie)
        return res.status(401).json({message: 'Unauthorized'})
    }
    return res.status(200).json({username: username})
}

exports.auth = async (req, res, next) => {
    return res.status(200).json({success: true})
}
