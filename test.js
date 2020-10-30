const fetch = require('node-fetch')
let fs = require("fs")

const stats = fs.statSync("./download.jpg")
const fileSizeInBytes = stats.size

// You can pass any of the 3 objects below as body
let readStream = fs.createReadStream("./download.jpg")
//var stringContent = fs.readFileSync('foo.txt', 'utf8');
//var bufferContent = fs.readFileSync('foo.txt');

fetch("http://localhost:5001/soiling-sensor/us-east4/imageTest", {
  method: "POST",
  headers: {
    "Content-length": fileSizeInBytes,
  },
  body: readStream, // Here, stringContent or bufferContent would also work
})
  .then(function (res) {
    return res.json()
  })
  .then(function (json) {
    console.log(json)
  })

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
        "Content-Type": "image/jpeg",
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

// sendPostRequest("http://localhost:5001/soiling-sensor/us-east4/imageTest")