import jwt from "jsonwebtoken"

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization


    // if (!authHeader?.startsWith('Bearer ')) {
    //     return res.status(401).json({ message: 'Unauthorized' })
    // }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        "cute",
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.username = decoded.user_info.username
            req.user_id = decoded.user_info.id
            // console.log('done')
            next()
        }
    )
}

export default verify