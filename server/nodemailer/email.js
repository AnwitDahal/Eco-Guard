const { ALERT_EMAIL_TEMPLATE } = require("./emailTemplate");
const { transporter } = require("./nodemailerconfig");

module.exports.sendAlertEmail = async (email, name, day, highAQI, address) => {
  try {
    const response = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "AQI Alert",
      // Call ALERT_EMAIL_TEMPLATE as a function with the necessary arguments
      html: ALERT_EMAIL_TEMPLATE(name, day, highAQI, address),
    });
    console.log(`Email sent successfully to: ${email}`);
  } catch (err) {
    console.error("Error sending alert email", err);
    throw new Error(`Error sending alert email: ${err}`);
  }
  console.log(email, name, day, highAQI, address);
};
