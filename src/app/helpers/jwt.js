import jwt from "jsonwebtoken"

const signInoptions = {
    expiresIn:"1h",
    
}

const refreshOptions = {
    expiresIn:"3h",
    
}


export const signInAccessToken = (payload, option = signInoptions) => {

    const secretKey = process.env.JWT_SECRET_KEY
    const token = jwt.sign(payload, secretKey, option)
    return token

}


export const signInRefreshToken = (payload, option = refreshOptions) => {

    const secretKey = process.env.REFRESH_SECRET_KEY
    const token = jwt.sign(payload, secretKey, option)
    return token

}

export const verifyToken = (token) => {

    try {
        const secretKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(token, secretKey)
        return decoded
        
    } catch (error) {
        console.log(error)
        return null
    }

}

export const verifyRefreshToken = (token) => {

    try {
        const secretKey = process.env.REFRESH_SECRET_KEY;
        const decoded = jwt.verify(token, secretKey)
        return decoded

    } catch (error) {
        console.log(error)
        return null
    }

}

export const decodeToken = (token) => {

    try {
     
        const decoded = jwt.decode(token, {complete: true})
        return decoded, decoded.payload

    } catch (error) {
        console.log(error)
        return null
    }

}

