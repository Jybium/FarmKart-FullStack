export {default} from "next-auth/middleware"

export const config = {
    matcher:[
        
        '/products',
        '/products/:id',
        '/sell',
        '/profile',
        '/sell-2',
        '/payment-successful',
        '/password-successful'
    ]
}