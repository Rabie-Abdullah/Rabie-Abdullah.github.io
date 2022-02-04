const express = require('express')
const sgMail = require('@sendgrid/mail')
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config()

const fs = require("fs");

const pathToAttachment = `${__dirname}/image.png`;
const attachment = fs.readFileSync(pathToAttachment).toString("base64");



const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

sgMail.setApiKey(process.env.SENDGRID_API_KEY)







app.post('/sendmail', async (req, res) => {
  let email = req.body.email
  let message = req.body.message

  try {
      sendmeEmail(email, message)
      res.status(201).send({ email, message })
  } catch (e) {
      res.status(400).send(e)
  }
})

const sendmeEmail = (email, message) => {
  sgMail.send({
      to: 'rabieabdullah2020@gmail.com',
      from: email,
      subject: 'Seeking to work together!',
      text: message,
      html: `<strong>${message}</strong>`,
      attachments: [
        {
          content: attachment,
          filename: "image.png",
          type: "application/image",
          disposition: "attachment"
        }
      ]
  }).then(() => {
    console.log('Message sent')
}).catch((error) => {
    console.log(error.response.body)
})

}

// const msg = {
//   to: 'rabieabdullah2020@gmail.com', // Change to your recipient
//   from: 'test@example.com', // Change to your verified sender
//   subject: 'Seeking for future work',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }

// sgMail
//   .send(msg)
//   .then((response) => {
//     console.log(response[0].statusCode)
//     console.log(response[0].headers)
//   })
//   .catch((error) => {
//     console.error(error)
//   })





app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
