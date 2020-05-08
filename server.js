var nodemailer = require('nodemailer');

const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express();
const PORT = process.env.PORT || 3000

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

app.use(allowCrossDomain)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/sendemail', sendEmail);
app.get('/', function (req, res) { res.send('hello world') })

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: 'mail.centroidpolymer@gmail.com',
    pass: 'pkovpmodkpebpuor'
  }
});

function sendEmail(req, res) {
  const body = req.body
  console.log(body, "body")
  console.log(req.file, "file")
  var mailOptions = {
    from: 'mail.centroidpolymer@gmail.com',
    to: [ 'info@centroidpolymer.com' ],
    subject: `New enquiry from ${body.name}`,
    attachments: body.fileName ? [ {
      filename: body.fileName,
      path: __dirname + body.filePath
    } ] : '',

    html: `<p style="font-weight: bold, color: #1a1a1a; font-size: 18px">We have a new enquiry,</p> 
          <table align="left" style="width: 70%; border-collapse: collapse;border: 1px solid #ccc">
            <tr>
              <th style="border: 1px solid #ccc">Name</th>
              <th style="border: 1px solid #ccc">Email</th>
              <th style="border: 1px solid #ccc">Mobile</th>
              <th style="border: 1px solid #ccc">Message</th>
              </tr>
            <tr>
              <td style="padding: 8px; text-align:center;border: 1px solid #ccc">${body.name}</td>
              <td style="padding: 8px;font-weight: bold; text-align:center;border: 1px solid #ccc">${body.email}</td>
              <td style="padding: 8px; font-weight: bold; text-align:center;border: 1px solid #ccc">${body.mobile}</td>
              <td style="padding: 8px;text-align:center;border: 1px solid #ccc">${body.message}</td>
            </tr>
            </table>`
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


app.listen(PORT, () => {
  console.log("server started")
})



