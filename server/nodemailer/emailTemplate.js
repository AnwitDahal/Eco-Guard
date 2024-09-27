module.exports.ALERT_EMAIL_TEMPLATE = (name, day, highAQI, address) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AQI Alert - Stay Safe</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #f97316, #ea580c); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">AQI Alert - Stay Safe</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello <strong>${name}</strong>,</p>
    <p>We wanted to inform you that the Air Quality Index (AQI) for <strong>${day}</strong> in <strong>${address}</strong> has been predicted to be high, with an AQI of <strong style="color: #ef4444; font-weight: bold;">${highAQI}</strong>.</p>
    <p>This level of AQI is considered <strong>unhealthy</strong>, and we recommend that you avoid going outside if possible, especially if you have respiratory issues or other health conditions.</p>
    <div style="text-align: center; margin: 30px 0;">
      <p style="font-size: 18px; font-weight: bold;">Please take necessary precautions and stay indoors.</p>
    </div>
    <p>If you have any questions or concerns, feel free to reach out to us.</p>
    <p>Stay safe,<br>Eco Guard</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
