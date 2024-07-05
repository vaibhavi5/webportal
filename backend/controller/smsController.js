const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Obtain from Twilio console
const authToken = process.env.TWILIO_AUTH_TOKEN; // Obtain from Twilio console
const client = new twilio(accountSid, authToken);

exports.sendSMS = async (req, res) => {
  const { to, message } = req.body;

  // Log the incoming request data for debugging purposes
  console.log('Request received:', req.body); 
  
  // Log the Twilio credentials being used, excluding sensitive information
  console.log('Using Twilio credentials:', {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    from: process.env.TWILIO_FROM_NUMBER,
  }); 

  try {
    // Attempt to send an SMS using the Twilio client
    const response = await client.messages.create({
      body: message,
      to: to, // The recipient's phone number
      from: process.env.TWILIO_FROM_NUMBER, // The phone number obtained from Twilio
    });

    // Log the response received from Twilio for debugging purposes
    console.log('Twilio response:', response); 
    
    // Send a success response with the Twilio response data
    res.status(200).json({ success: true, response });
  } catch (error) {
    // Log any errors that occur during the SMS sending process
    console.error('Error sending SMS:', error); 
    
    // Send an error response with the error message
    res.status(500).json({ success: false, error: error.message });
  }
};
