import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'


var firebaseConfig = {
  apiKey: "AIzaSyBiZGAod03bc4kOCflUmVzeqdDUJjozPrw",
  authDomain: "soiling-sensor.firebaseapp.com",
  databaseURL: "https://soiling-sensor.firebaseio.com",
  projectId: "soiling-sensor",
  storageBucket: "soiling-sensor.appspot.com",
  messagingSenderId: "405425347873",
  appId: "1:405425347873:web:5071328f0bf25548103260",
  measurementId: "G-7NY910W446",
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()

export const getDataFromRef = async refString => {
  try {
    var dataRef = await firebase
      .database()
      .ref(refString)
      .once('value')
    return dataRef.val()
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getContinuousDataFromRef = async (refString, callback) => {
  var dataRef = firebase.database().ref(refString)
  dataRef.on('value', function(snapshot) {
    callback(snapshot.val())
  })
}

export const writeToRef = async (refString, data) => {
  try {
    await firebase
      .database()
      .ref(refString)
      .set(data)
    return true
  } catch (e) {
    console.log(e)
    return null
  }
}

export const pushToRef = async (refString, data) => {
  try {
    await firebase
      .database()
      .ref(refString)
      .push(data)
    return true
  } catch (e) {
    console.error(e)
    return null
  }
}

export const removeAtRef = async refString => {
  try {
    await firebase
      .database()
      .ref(refString)
      .remove()
    return true
  } catch (e) {
    console.error(e)
    return null
  }
}

export const customFetch = async (url, body) => {
  const test = true
  if (!url) return null
  let urlToSend = test ? 'http://localhost:5222/pdlaunchny/us-east4/' : 'https://us-east4-pdlaunchny.cloudfunctions.net/'
  if (url.substring(0, 1) === '/') urlToSend += url.substring(1)
  else urlToSend += url

  if (body) return await sendAuthenticatedPostRequest(urlToSend, body)
  else return await sendAuthenticatedRequest(urlToSend)
}

export const sendAuthenticatedRequest = async url => {
  let toReturn = {}
  try {
    const authToken = await auth.currentUser.getIdToken()
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
      method: 'GET'
    }
    const response = await fetch(url, config)
    const status = response.status
    const { message } = await response.json()
    toReturn = { status, message }
  } catch (err) {
    toReturn = {
      status: 500,
      message: err
    }
  }
  logResponse(toReturn, url)
  return toReturn
}

export const sendRequest = async url => {
  let toReturn = {}
  try {
    const config = {
      method: 'GET'
    }
    const response = await fetch(url, config)
    console.log(response)
    const status = response.status
    const { message } = await response.json()
    console.log(message)
    toReturn = { status, message }
  } catch (err) {
    toReturn = {
      status: 500,
      message: err
    }
  }
  logResponse(toReturn, url)
  return toReturn
}

export const sendAuthenticatedPostRequest = async (url, data) => {
  let toReturn = {}
  try {
    const authToken = await auth.currentUser.getIdToken()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      },
      method: 'POST',
      body: JSON.stringify(data)
    }
    const response = await fetch(url, config)
    const status = response.status
    const { message } = await response.json()
    toReturn = { status, message }
  } catch (err) {
    toReturn = {
      status: 500,
      message: err
    }
  }
  logResponse(toReturn, url)
  return toReturn
}

export const sendPostRequest = async (url, data) => {
  let toReturn = {}
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    }
    console.log(config)
    const response = await fetch(url, config)
    console.log(response)
    const status = response.status
    const message = await response.json()
    toReturn = { status, message }
  } catch (err) {
    toReturn = {
      status: 500,
      message: err
    }
  }
  logResponse(toReturn, url)
  return
}

export const writeFileToRef = async (ref, file) => {
  try {
    const res = await firebase
      .storage()
      .ref(ref)
      .put(file)
    return res
  } catch (e) {
    return null
  }
}

const logResponse = (res, url) => {
  console.log('Request was made to ' + url + ':')
  if (res.status < 200 || res.status > 299) {
    console.error(res)
  } else {
    console.log(res)
  }
}

export const clearCookiesAndSignOut = () => {
  window.localStorage.clear()
  auth.signOut()
}
