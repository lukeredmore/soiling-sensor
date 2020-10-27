const fetch = require('node-fetch')

const logResponse = (res, url) => {
  console.log("Request was made to " + url + ":")
  if (res.status < 200 || res.status > 299) {
    console.error(res)
  } else {
    console.log(res)
  }
}
const sendPostRequest = async (url, data) => {
  let toReturn = {}
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
    console.log(config)
    const response = await fetch(url, config)
    console.log(response)
    const status = response.status
    const message = await response.json()
    console.log(message)
    toReturn = { status, message }
  } catch (err) {
    toReturn = {
      status: 500,
      message: err,
    }
  }
  logResponse(toReturn, url)
  return
}

sendPostRequest("http://localhost:5001/soiling-sensor/us-east4/sendLightValue", {lightValue: 8})