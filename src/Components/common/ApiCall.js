// eslint-disable-next-line no-unused-vars
import React from 'react';
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

//import { SetNotification } from '../Utilities';
//const delaysuccess = 5000; // milliseconds used for popups
//const delayerror = 10000; // milliseconds used for popups

import PropTypes from 'prop-types';

function makeNotice(json,funcName,status,defaultMessage='failed') {
    return {
            source: (json['module'] ? json['module'] : funcName),
            status: (json['status'] ? json['status'] : status),
            message: (json['message'] ? json['message'] : funcName + ' ' + defaultMessage)
    }
}

function ApiCall(functionName, apiMethod, path, verbosity, requestBody) {
  const funcName = functionName;
  var notice = [];
  var result = null;
  var status = '';
  var statusText = '';

  var logLevel = 3;

  var method = null;
  var options = null;

  switch (verbosity.toLowerCase()) {
    case 'all':
      logLevel = 7;
      break;
    case 'trace':
      logLevel = 6;
      break;
    case 'debug':
      logLevel = 5;
      break;
    case 'info':
      logLevel = 4;
      break;
    case 'warn':
      logLevel = 3;
      break;
    case 'error':
      logLevel = 2;
      break;
    case 'fatal':
      logLevel = 1;
      break;
    case 'none':
      logLevel = 0;
      break;
    default:
      logLevel = 3; // Default log level is warn
  }

  let choices = ['GET', 'PATCH', 'PATCH', 'POST', 'DELETE'];
  if (choices.indexOf(apiMethod.toUpperCase()) > -1) {
    method = apiMethod.toUpperCase();
  } else {
    console.error('ApiCall received invalid API method',apiMethod);
    return undefined;
  }
  if (method === 'GET') {
    options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } else {
    options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody
    };
  }

  // console.debug("ApiCall path", path, "requestBody", requestBody)

  try {
    result = fetch(path, options)
    .then(response => {
      if (!response.ok) {
        throw response;
      }
      status = response['status'];
      // https://stackoverflow.com/a/37121496
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json().then(json => {
          if (status === 200) {
            if (logLevel >= 4) {
              notice = {
                source: (json['module'] ? json['module'] : funcName),
                status: (json['status'] ? json['status'] : status),
                message: (json['message'] ? json['message'] : funcName + ' succeeded.')
              };
              console.warn(notice)
            }
            return(json);

          } else {
            if (logLevel >= 3) {
              notice = {
                source: (json['module'] ? json['module'] : funcName),
                status: (json['status'] ? json['status'] : status),
                message: (json['message'] ? json['message'] : funcName + ' failed.')
              };
              console.warn(notice)
            }
            return(json);
          }
        });

      } else {
        return response.text().then(text => {
          if (logLevel >= 3) {
            notice = {
              source: funcName,
              status: status,
              message: funcName + ' returned text: ' + text
            };
            console.warn(notice)
          }
          return(text);
        });
      }
    })
    .catch(error => {
      console.error(funcName + ' failed with error.', error);
      status = (error['status'] ? error['status'] : 500);
      statusText = (error['statusText'] ? error['statusText'] : 'Server Error');

      // https://stackoverflow.com/a/37121496
      const contentType = (error.headers ? error.headers.get('content-type') : null);
      // console.error(funcName + ' failed with error contentType.', contentType);
      if (contentType && contentType.indexOf('application/json') !== -1) {
        // console.error(funcName + ' failed with error contentType.', contentType)
        return error.json().then(json => {
          if (logLevel >= 2) {
            notice = {
              source: (json['module'] ? json['module'] : funcName),
              status: (json['status'] ? json['status'] : status),
              message: (json['message'] ? json['message'] : funcName + ' failed.')
            };
            console.error(notice)
          }
          // console.error(funcName + ' error.json:', json)
          status = (json['status'] ? json['status'] : 418)
          statusText = (json['message'] ? json['message'] : funcName + ' failed.')
          return (json ? json : undefined);
        });
      } else if (contentType && contentType.indexOf('text/html') !== -1) {
        // console.error(funcName + ' failed with error contentType.', contentType)
        return error.text().then(text => {
          if (logLevel >= 2) {
            console.warn(funcName + ' error response was text:', statusText);
            notice = {
              source: funcName,
              status: status,
              message: funcName + ' returned text: ' + text
            };
            console.error(notice)
          }
          // console.error(funcName + ' error.text:', text)
          return (text ? text : undefined);
        });
      } else {
        console.warn(funcName + ' error response was', error);
        notice = {
          source: funcName,
          status: status,
          message: funcName + ' returned: ' + error
        };
      }
      console.error(funcName + ' returning error.', error);
      return error;
    });
  } catch (err) {
    console.error(funcName + ' encountered with error.', err);
    status = (err['status'] ? err['status'] : 402);

    const contentType = err.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      return err.json().then(json => {
        if (logLevel >= 1) {
          console.warn(funcName +' error response was json:', json);
          notice = {
            source: funcName,
            status: status,
            message: funcName + ' returned json: ' + json
          };
          console.error(notice)
        }
      });
    } else {
      return err.text().then(text => {
        if (logLevel >= 1) {
          console.error(funcName + ' error response was text:', text);
          notice = {
            source: funcName,
            status: status,
            message: funcName + ' returned text: ' + text
          };
          console.error(notice)
        }
      });
    }
  }

  if (result) {
    return result;
  } else {
    return undefined;
  }

}

function ApiCallPromise(functionName, apiMethod, path, headers, verbosity, requestBody) {
    return new Promise(function(resolve,reject) { 
    const funcName = functionName;
    var notice = [];
    var result = null;
    var status = '';
    var statusText = '';
  
    var logLevel = 3;
  
    var method = null;
    var options = null;
  
    switch (verbosity.toLowerCase()) {
      case 'all':
        logLevel = 7;
        break;
      case 'trace':
        logLevel = 6;
        break;
      case 'debug':
        logLevel = 5;
        break;
      case 'info':
        logLevel = 4;
        break;
      case 'warn':
        logLevel = 3;
        break;
      case 'error':
        logLevel = 2;
        break;
      case 'fatal':
        logLevel = 1;
        break;
      case 'none':
        logLevel = 0;
        break;
      default:
        logLevel = 3; // Default log level is warn
    }
  
    let choices = ['GET', 'PATCH', 'PATCH', 'POST', 'DELETE'];
    if (choices.indexOf(apiMethod.toUpperCase()) > -1) {
      method = apiMethod.toUpperCase();
    } else {
      console.error('ApiCall received invalid API method',apiMethod);
      return undefined;
    }
    if (method === 'GET') {
      options = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
      };
    } else {
      options = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: requestBody
      };
    }
  
    // console.debug("ApiCall path", path, "requestBody", requestBody)
  
      result = fetch(path, options)
      .then(response => {
        if (!response.ok) {
          reject(response);
        }
        status = response['status'];
        // https://stackoverflow.com/a/37121496
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          response.json()
          .then(json => {
            // TODO account for 204 and 202
            if (status === 200) {
              if (logLevel >= 4) {
                console.warn(makeNotice(json,funcName,status,' succeeded.'))
              }
              resolve(json);
  
            } else {
              if (logLevel >= 3) {
                console.warn(makeNotice(json,funcName,status,' failed status code check.'))
              }
              reject(json);
            }
          });
        // response not JSON
        } else {
          return response.text().then(text => {
            if (logLevel >= 3) {
                console.warn(makeNotice({},funcName,status,' returned text: ' + text))
            }
            resolve(text);
          });
        }
      })
      // fetch failed
      .catch(error => {
        console.error(funcName + ' failed with error.', error);
        status = (error['status'] ? error['status'] : 500);
        statusText = (error['statusText'] ? error['statusText'] : 'Server Error');
  
        // https://stackoverflow.com/a/37121496
        const contentType = (error.headers ? error.headers.get('content-type') : null);
        // console.error(funcName + ' failed with error contentType.', contentType);
        if (contentType && contentType.indexOf('application/json') !== -1) {
          // console.error(funcName + ' failed with error contentType.', contentType)
          reject(error.json().then(json => {
            if (logLevel >= 2) {
              console.error(makeNotice(json,funcName,status,' failed.'))
            }
            // console.error(funcName + ' error.json:', json)
            status = (json['status'] ? json['status'] : 418)
            statusText = (json['message'] ? json['message'] : funcName + ' failed.')
            return(json ? json : undefined);
          }));
        } else if (contentType && contentType.indexOf('text/html') !== -1) {
          // console.error(funcName + ' failed with error contentType.', contentType)
          reject(error.text().then(text => {
            if (logLevel >= 2) {
              console.error(makeNotice({},funcName,status,' returned text: ' + text))
            }
            return (text ? text : undefined);
          }));
        } else {
          console.warn(makeNotice({},funcName,status,' returned text: ' + error));
        }
        console.error(funcName + ' returning error.', error);
        reject(error);
      });
      // } catch err => {
      /*
      // This is global error handling... not sure what to do here
      console.error(funcName + ' encountered with error.', err);
      status = (err['status'] ? err['status'] : 402);
  
      const contentType = err.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return err.json().then(json => {
          if (logLevel >= 1) {
            console.warn(funcName +' error response was json:', json);
            notice = {
              source: funcName,
              status: status,
              message: funcName + ' returned json: ' + json
            };
            console.error(notice)
          }
        });
      } else {
        return err.text().then(text => {
          if (logLevel >= 1) {
            console.error(funcName + ' error response was text:', text);
            notice = {
              source: funcName,
              status: status,
              message: funcName + ' returned text: ' + text
            };
            console.error(notice)
          }
        });
      } */
    } )
  
  }

ApiCall.propTypes = {
  functionName: PropTypes.string.isRequired,
  apiMethod: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  verbosity: PropTypes.string,
  requestBody: PropTypes.object,
};

ApiCallPromise.propTypes = {
    functionName: PropTypes.string.isRequired,
    apiMethod: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    verbosity: PropTypes.string,
    requestBody: PropTypes.object,
  };

export { ApiCallPromise };
