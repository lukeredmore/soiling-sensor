const nodemailer = require('nodemailer')
const credentials = require('./credentials.json')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: credentials.USERNAME,
    pass: credentials.PASSWORD
  }
})

exports.sendEmail = async (to, subject, html) => {
  if (!to || !subject || !html)  {
    const err = {message: "Invalid Parameters"}
    console.log("Invalid Parameters")
    throw err
  }

  const mailOptions = {
    from:  'Soiling Sensor<' + credentials.USERNAME + '>',
    to,
    subject,
    html
  }

  return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, error => {
        if (error) {
          reject(error)
        } else {
          resolve(true)
        }
      }
    )
  })

}
