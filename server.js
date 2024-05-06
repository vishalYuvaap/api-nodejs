const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'contact@yuvaap.com',
    pass: 'rlpn ouzy egtf fdqd'
  }
});

// Function to send an email
function sendEmail(data) {
  let mailOptions = {
    from: 'contact@yuvaap.com',
    to: 'vishal.kumar@yuvaap.com',
    subject: 'New Submission Received',
    text: `Data received: ${JSON.stringify(data)}`,
    html: `<p>Data received:</p><pre>${JSON.stringify(data, null, 2)}</pre>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable All CORS Requests
app.use(cors()); 

// POST endpoint to handle the form submission
app.post('/submitquestion', (req, res) => {
  const { email, countA, countB, countC } = req.body;
  console.log('Received data:', { email, countA, countB, countC });

  // Send an email with the data
  sendEmail({ email, countA, countB, countC });

  res.status(200).send({ message: 'Data received successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
