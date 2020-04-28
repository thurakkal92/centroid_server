var nodemailer = require('nodemailer');

const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/sendemail', sendEmail);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: 'mail.centroidpolymer@gmail.com',
    pass: 'Centroid@123'
  }
});

function sendEmail(req, res) {

  var mailOptions = {
    from: 'mail.centroidpolymer@gmail.com',
    to: [ 'nabeel.thurakkal92@gmail.com', 'info@centroidpolymer.com', 'nikhilmathew.mec@gmail.com' ],
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json({ status: 400, message: error }).status(400)
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ status: 200, message: 'Email sent' }).status(200)
    }

  });
}
app.get('/', function (req, res) { res.send('hello world') })

app.listen(PORT, () => {
  console.log("server started")
})



