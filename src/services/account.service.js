import { ApiCallPromise } from "../Components/common/ApiCall";
import authHeader from "./auth-header";
import authService from "./auth.service";

// TODO this line is for dev, should not matter on a real deployment
const accountServer = "/api/v1"
//const accountServer = "http://localhost:8080/api/v1"


function GetAccount(accountId) {
  const account = JSON.parse(localStorage.getItem('account'));
  //FIXME mock returns a succesful object every time
  return new Promise( function( resolve,reject) { return resolve({"timeout":1670989800,"last_pushed":0,"status":"Active","max_devices":5,"devices":null,"uuid":"f6f58a62-888f-48fb-a5da-f59ca46a9ce2"})})

  if( ! account ) {
      if( ! accountId ) {
        console.log("Get account cant find accounts")
        return new Promise(function(resolve,reject) { return reject("No account Id set")})
      }
      //setup login
      return ( authService.login(accountId)
      .then(resp => {
          return resp.account
      })
      )
   }
  const uri = accountServer + "/account" 
  return ApiCallPromise("GetAccount", 'GET', uri, authHeader() , 'fatal')
}

function AddDevice(accountId, device) {
    const a_device = {
        "public_key": device.public_key,
    }
    //const uri = accountServer + "/account/" + accountId + "/key"
    const uri = accountServer + "/account/key"
    return ApiCallPromise("AddDevice", 'POST', uri, authHeader(), 'warn', JSON.stringify(a_device))
}

function DeleteDevice(accountId, _public_key) {
    const a_body = { public_key: _public_key }
    //const uri = accountServer + "/account/" + accountId + "/key"
    const uri = accountServer + "/account/key"
    return ApiCallPromise("DeleteDevice", 'DELETE', uri, authHeader(),  'error', JSON.stringify(a_body))
}

function PayWithStripe(accountId, _plan) {
    const uri = accountServer + "/account/payment/stripe"
    const a_body = { plan: _plan}
    return ApiCallPromise("PayWithStripe", 'POST', uri, authHeader(), 'warn', JSON.stringify(a_body))
}

function SubscribeWithStripe(accountId) {
    const uri = accountServer + "/account/payment/stripe/subscribe"
    return ApiCallPromise("SubscribeWithStripe", 'POST', uri, authHeader(), 'warn', "{}")
}

function PaymentManager(accountId) {
    const uri = accountServer + "/account/manage/subscription"
    return ApiCallPromise("PaymentManager",'POST', uri, authHeader(), 'warn', "{}")
}

export { AddDevice, DeleteDevice, GetAccount, PayWithStripe, SubscribeWithStripe, PaymentManager, accountServer} ;