import { accountServer } from "./account.service"
import { ApiCallPromise } from "../Components/common/ApiCall"

class AuthService {
    login(accountId) {
        const uri = accountServer + '/login'
        const a_body = { uuid: accountId } 
        //TODO do some additionall processing before we simply save the data.
        //return ApiCallPromise("AddDevice", 'POST', uri, 'warn', JSON.stringify(a_body))
        return new Promise((resolve,reject) => {
            ApiCallPromise("AuthService.signin", 'POST', uri, {}, 'warn', JSON.stringify(a_body))
            .then( resp => {
                if ( resp.auth_token) {
                    localStorage.setItem('account', JSON.stringify({ auth_token: resp.auth_token}))
                }
                resolve(resp)
            })
            .catch(err => reject(err))
        })
    }

    logout() {
        localStorage.removeItem('account')
    }

    register() {
        //const uri = baseuri + 'register'
        const uri = accountServer + "/signup"
        const a_body = {}
        return new Promise((resolve,reject) => {
            ApiCallPromise("authService.register", 'POST', uri, {}, 'warn', JSON.stringify(a_body))
            .then( resp => {
                if ( resp.accessToken) {
                    localStorage.setItem('account', JSON.stringify(resp))
                }
                resolve(resp)
            })
            .catch(err => reject(err))
        })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('account'))
    }
}

export default new AuthService();