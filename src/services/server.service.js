import { ApiCallPromise } from "../Components/common/ApiCall"
import authHeader from "./auth-header"

// TODO this line is for dev, should not matter on a real deployment
const ServerEndpoint = ""
//const ServerEndpoint = "http://localhost:8081"


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
      ipv6_address: "2001:19f0:5:251d:5400:3ff:fec6:9a98",
      multi_port: 0
    }

  ]
  // FIXME mock return list of servers
  return new Promise(function(resolve,reject){ return resolve(fakereturn)})

  const uri = ServerEndpoint + "/server" 
  return ( 
    ApiCallPromise("GetServer", 'GET', uri, authHeader() , 'fatal')
    .catch( err => { return fakereturn }
    )
  )
}

export { GetServers } ;