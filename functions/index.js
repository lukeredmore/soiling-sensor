const functions = require("firebase-functions")
const admin = require("firebase-admin")
const cors = require("cors")({ origin: true })

var serviceAccount = require("./soiling-sensor-firebase-adminsdk-jc9nx-c145f6b1f6.json")
const { sendEmail } = require("./email")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://soiling-sensor.firebaseio.com",
})

exports.sendLightValue = functions
  .region("us-east4")
  .https.onRequest((req, res) => {
    cors(req, res, async () => {
      if (req.body.lightValue) {
        try {
          const snapshot = await admin.database().ref('UsersToEmail').once('value')
          const emails = snapshot.val() ? Object.values(snapshot.val()).reduce((prev, current) => prev + ", " + current) : ""

          const date = new Date()
          date.toLocaleTimeString
          await admin
            .database()
            .ref("LightLevels/" + date.getTime())
            .set(req.body.lightValue)
          await sendEmail(
            emails,
            "New light sensor value recorded",
            `On ${date.toLocaleDateString("en-us", {
              timeZone: "America/New_York",
            })} at ${date.toLocaleTimeString("en-us", {
              timeZone: "America/New_York",
            })}, the light sensor recorded a value of ${req.body.lightValue}.`
          )
          return res.status(200).json({
            message:
              "Successfully added light value of: " + req.body.lightValue,
          })
        } catch (err) {
          return res.status(500).json({ message: err.localizedDescription })
        }
      } else {
        return res
          .status(400)
          .json({ message: "No light sensor value provided!" })
      }
    })
  })

// const sendSMS = async (messageToSend) => {
//   let toReturn = {}
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       method: "POST",
//       body: `apikey=QnaBw7+plag-bnZfFpmeXSq8SmFi6j85M6YtNg35k6&message=${messageToSend}&sender=TEST SENDER&numbers=6077278129`,
//     }
//     console.log(config)
//     const response = await fetch("https://api.txtlocal.com/send/?", config)
//     const status = response.status
//     const message = await response.json()
//     toReturn = { status, message }
//     console.log(JSON.stringify(message))
//   } catch (err) {
//     toReturn = {
//       status: 500,
//       message: err,
//     }
//   }

//   return
// }
