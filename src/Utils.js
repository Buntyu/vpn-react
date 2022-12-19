import React, { useState, useEffect } from "react";
import QRCode from 'qrcode';
import { ApiCallPromise } from "./Components/common/ApiCall";
const qrcodeSize = 320

// TODO this line is for dev, should not matter on a real deployment
//const accountServer = "http://localhost:8080"
const accountServer = ""


function GetAccount(accountId) {
  const uri = accountServer + "/account/" + accountId
  return ApiCallPromise("GetAccount", 'GET', uri, 'fatal')
}

function AddDevice(accountId, device) {
  const a_device = {
    "public_key": device.public_key,
  }
  const uri = accountServer + "/account/" + accountId + "/key"
  return ApiCallPromise("AddDevice", 'POST', uri, 'warn', JSON.stringify(a_device))
}

function DeleteDevice(accountId, _public_key) {
  const a_body = { public_key: _public_key }
  const uri = accountServer + "/account/" + accountId + "/key"
  return ApiCallPromise("DeleteDevice", 'DELETE', uri, 'error', JSON.stringify(a_body))
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


function GetServers() {
  const fakereturn = [
    /*
    {
      "country_code": "{{ country_code }}",
      "country_name": "{{ country_name }}",
      "region_name": "{{ region_name }}",
      "region_code": "{{ region_code }}",
      "city_name": "{{ city_name }}",
      "location": {
        "latitude": {{ latitude }},
        "longitude": {{ longitude }}
      },
      "timezone": "{{ timezone }}",
      "name": "{{ ansible_facts['fqdn'] }}",
      "features": [
        "Client"
      ],
      "dns": "{{ dns }}",
      "public_key": "{{ wg_public_key.stdout }}",
      "ipv4_address": "{{ ansible_facts['default_ipv4']['address'] }}",
      "ipv6_address": "{{ ansible_facts['default_ipv6']['address'] }}",
      "multi_port": 0
      }, */
    {
      id: "1",
      country_code: "US",
      country_name: "United States",
      region_name: "New Jersey",
      region_code: "NJ",
      city_name: "Newark",
      location: {
        latitude: 40.72,
        longitude: 74.17
      },
      timezone: "America/New_York",
      name: "dev-nj-01.tafrosvpn.com",
      features: [
        "Client"
      ],
      dns: "1.1.1.1",
      public_key: "E8lsTmpwqr3mJZAaS2BdxaK3OjlsvAGEJ/Eg5MK01So=",
      ipv4_address: "173.199.126.78",
      address_ipv6: "2001:19f0:5:251d:5400:3ff:fec6:9a98",
      multi_port: 0
    }

  ]
  return new Promise(function (resolve, reject) { resolve(fakereturn) })
}

function GenerateQRCode({ string, size, type }) {
  /*
   * https://www.npmjs.com/package/qrcode
   */

  const outputtype = ((type === null || type === undefined) ? 'svg' : type);
  const graphicSize = ((size === null || size === undefined) ? qrcodeSize : size);
  // console.debug("GenerateQRCode type", type, "size", size)
  // console.debug(string)

  var opts = {
    errorCorrectionLevel: 'H',
    type: outputtype,
    width: graphicSize,
    margin: 1,
    color: {
      dark: '#333333ff',
      light: '#ccccccff'
    }
  };

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function generateQR() {

      setLoading(true);

      try {
        await QRCode.toDataURL(string, opts)
          .then(data => {
            setData(data);
            setLoading(false);
          })
          .catch(error => {
            console.error('GenerateQRCode failed.', error);
          });

      } catch (err) {
        console.error('GenerateQRCode encountered error:', err);
      }

      return undefined;
    }

    generateQR();
  }, []);

  return (
    <>
      {(isLoading || data === null) ? (
        <p>Loading ...</p>
      ) : (
        <img src={data} alt="QRcode to scan same as config below" />
      )}
    </>
  );
}

export {  GenerateQRCode };


