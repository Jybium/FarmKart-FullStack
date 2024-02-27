
import {SignJWT, jwtVerify} from "jose"

const signInoptions = {
    expiresIn:"1h",
    
}

const refreshOptions = {
    expiresIn:"24h",
    
}


// TO CREATE A JWT
export const signAccessJWT = async (
  payload,
  options
) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const alg = "HS256";
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(options)
      .setIssuedAt()
      .setSubject(payload)
      .sign(secret);
  } catch (error) {
    throw error;
  }
};


export const signRefreshJWT = async (
  payload

) => {
  try {
    const secret = new TextEncoder().encode(process.env.REFRESH_SECRET_KEY);
    const alg = "HS256";
    return new SignJWT(payload.id)
      .setProtectedHeader({ alg })
      .setExpirationTime(payload.expires)
      .setIssuedAt()
      .setSubject(payload)
      .sign(secret);
  } catch (error) {
    throw error;
  }
};


// USAGE




// TO VERIFY A JWT

export const verifyAccessJWT = async (token) => {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY)
      )
    ).payload
  } catch (error) {
    console.log(error);
    throw new Error("Your token has expired.");
  }
};


export const verifyRefreshJWT = async (token) => {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.REFRESH_SECRET_KEY)
      )
    ).payload
  } catch (error) {
    console.log(error);
    throw new Error("Your token has expired.");
  }
};




// export const signAccessJWT = (payload, option = signInoptions) => {

//     const secretKey = process.env.JWT_SECRET_KEY
//     const token = jwt.sign(payload, secretKey, option)
//     return token

// }


// export const signRefreshJWT = (payload, option = refreshOptions) => {

//     const secretKey = process.env.REFRESH_SECRET_KEY
//     const token = jwt.sign(payload, secretKey, option)
//     return token

// }

// export const verifyAccessJWT = (token) => {

//     try {
//         const secretKey = process.env.JWT_SECRET_KEY;
//         const decoded = jwt.verify(token, secretKey)
//         return decoded
        
//     } catch (error) {
//         console.log(error)
//         throw new Error("Token Expired")
//         // return error
//     }

// }

// export const verifyRefreshJWT = (token) => {

//     try {
//         const secretKey = process.env.REFRESH_SECRET_KEY;
//         const decoded = jwt.verify(token, secretKey)
//         return decoded

//     } catch (error) {
//         console.log(error)
//         throw new Error("Token Expired")
//     }

// }



// export const decodeToken = (token) => {

//     try {
     
//         const decoded = jwt.decode(token, {complete: true})
//         return decoded, decoded.payload

//     } catch (error) {
//         console.log(error)
//         return null
//     }

// }

