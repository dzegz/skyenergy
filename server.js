const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Endpoint to handle form submissions
app.post('/submit-form', (req, res) => {
    var { email, message } = req.body;

    if (!email || !message) {
        //return res.json({ success: false, error: 'All fields are required' });
    } else {
        // Configure nodemailer
        var transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service (e.g., Gmail)
            auth: {
                user: 'aldin.dzelo@gmail.com',
                pass: 'xvbvmorewnrmpsrg',
            },
        });

        var mailOptions = {
            from: email,
            to: 'aldin.dzelo@gmail.com', // Your email address to receive the message
            subject: `SkyEnergy: Message from ${email}`,
            text: message,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                //console.error(error);
                //return res.json({ success: false, error: 'Failed to send email' });
            } else{
                console.log("Email send: " + info.response)
                res.json({ success: true, message: 'Email was sent successfully!' });
            }
            //res.redirect("/contact.html")
            //res.json({ success: true });
            
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
