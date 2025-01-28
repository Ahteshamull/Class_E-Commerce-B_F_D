const nodemailer = require("nodemailer");

async function SendOtp(email, verifyCode) {
  const emailTemplate_verify = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
            <img style="width:100px;height:100px" src="https://i.ibb.co.com/0cSkM24/1600w-cp-I8ix-Epis8.webp" alt="">
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is
            valid
            for 2 Minute</p>
        <h2
            style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">
{verifyCode}</h2>
        <p style="font-size:0.9em;">Regards,<br />AH SHOP</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Ah Shop</p>
            <p>1600 Amphitheatre Parkway</p>
            <p>California</p>
        </div>
    </div>
</div>
</body>

</html>
`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.OTP_EMAIL,
      pass: process.env.OTP_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.OTP_EMAIL, // sender address
    to: email, // list of receivers
    subject: "Please Verify Your Email", // Subject line

    html: emailTemplate_verify.replace("{verifyCode}", verifyCode), // html body
  });
}

module.exports = SendOtp;
// const nodemailer = require("nodemailer");

// async function SendOtp(email, verifyCode) {
//    let counter = 100; // Starting counter
//   const decrementRate = 1; // Decrease by 1 per interval
//   const threshold = 10; // Threshold when to send an email
 
//   console.log(`Counter: ${counter}`);

//   if (counter <= threshold) {
//     console.log("Counter has reached the threshold. Sending OTP...");
//     SendOtp(email, verifyCode)
//       .then(() => {
//         console.log(`OTP sent to ${email} at counter: ${counter}`);
//       })
//       .catch((error) => {
//         console.error("Error sending OTP:", error);
//       });
//   }

//   // Decrement the counter
//   counter -= decrementRate;

//   if (counter <= 0) {
//     console.log("Counter reached zero.");
//     clearInterval(decrementInterval); // Stop the interval when counter reaches zero
//   }


// // Decrement counter every 2 minutes (120,000 milliseconds)
// const decrementInterval = setInterval(decrementCounter, 120000);
//   const emailTemplate_verify = `
// <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>

// <body>
// <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
//     <div style="margin:50px auto;width:70%;padding:20px 0">
//         <div style="border-bottom:1px solid #eee">
//             <img style="width:100px;height:100px" src="https://i.ibb.co.com/0cSkM24/1600w-cp-I8ix-Epis8.webp" alt="Logo">
//         </div>
//         <p style="font-size:1.1em">Hi,</p>
//         <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is
//             valid
//             for 2 Minutes</p>
//         <h2
//             style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">
//             {verifyCode}
//         </h2>
//         <p style="font-size:0.9em;">Regards,<br />AH SHOP</p>
//         <hr style="border:none;border-top:1px solid #eee" />
//         <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
//             <p>Ah Shop</p>
//             <p>1600 Amphitheatre Parkway</p>
//             <p>California</p>
//         </div>
//     </div>
// </div>
// </body>

// </html>
// `;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.OTP_EMAIL,
//       pass: process.env.OTP_PASSWORD,
//     },
//   });

//   const info = await transporter.sendMail({
//     from: process.env.OTP_EMAIL, // sender address
//     to: email, // list of receivers
//     subject: "Please Verify Your Email", // Subject line
//     html: emailTemplate_verify.replace("{verifyCode}", verifyCode), // html body
//   });

//   console.log("OTP sent: ", info.messageId);
// }
//  module.exports = SendOtp;

// Decrement counter every 2 minutes
 // OTP for demonstration

// Function to handle decrement and check for threshold
