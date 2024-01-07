export const setCookie = (cookiesValue) => {
    const cookieName = "token"
    const cookieValue = cookiesValue


    const expirationDate = new Date()
    expirationDate.setFullYear(expirationDate.getFullYear() - 1)

    document.cookie = `${cookieName}= ${cookieValue};
    HttpOnly; expires= ${expirationDate.toUTCString()}; path=/`;
}


export const getCookie = () => {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim())

    const desiredCookie = cookies.find(cookie => cookie.startsWith("token"))

    if(desiredCookie){

        return desiredCookie.split("=")[1];

    } else {

        return "Cookie not found"
        
    }
}