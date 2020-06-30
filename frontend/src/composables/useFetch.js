import { reactive } from "@vue/composition-api"

function useFetch({ url, method, body, cb }) {
  return fetch(
    url,
    {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }
  ).then(response => {
    let res = response.json()
    cb(response)
    return res
  }).catch((error) => {
    console.error('Error:', error)
  })
}

export function useEndpoint() {
  const responseState = reactive({
    error: false,
    result: {},
    loading: false,
  })

  function post(endpoint, body, queryparam=null) {
    responseState.loading = true
    let prod = true
    if(process.env.NODE_ENV == "dev") prod = false
    let url = `http://localhost:4000/${[endpoint, queryparam].join('/')}`
    if(prod) url = `https://short.colehollant.com/${[endpoint, queryparam].join('/')}`
    let code = -1
    useFetch({
      url,
      method: 'POST',
      body,
      cb: (response) => { code = response.status }
    })
    .then((response) => {
      if(code !== 200) {
        responseState.error = true
        responseState.result = response
        responseState.loading = false
        return
      }
      responseState.error = false
      responseState.result = response
      responseState.loading = false
    }) 
  }

  function get(endpoint, queryparam=null) {
    responseState.loading = true
    let prod = true
    if(process.env.NODE_ENV == "dev") prod = false
    let url = `http://localhost:4000/${[endpoint, queryparam].join('/')}`
    if(prod) url = `https://short.colehollant.com/${[endpoint, queryparam].join('/')}`
    let code = -1
    useFetch({
      url,
      method: 'GET',
      cb: (response) => { code = response.status }
    })
    .then((response) => {
      if(code !== 200) {
        responseState.error = true
        responseState.result = response
        responseState.loading = false
        return
      }
      responseState.error = false
      responseState.result = response.data
      responseState.loading = false
    }) 
  }

  return { responseState, post, get }
}