const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID; // 从 Twilio 控制台获取
const authToken = process.env.TWILIO_AUTH_TOKEN; // 从 Twilio 控制台获取
const client = new twilio(accountSid, authToken);

exports.sendSMS = async (req, res) => {
  const { to, message } = req.body;

  console.log('Request received:', req.body); // 添加这行日志
  console.log('Using Twilio credentials:', {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    from: process.env.TWILIO_FROM_NUMBER,
  }); // 添加这行日志

  try {
    const response = await client.messages.create({
      body: message,
      to: to, // 接收短信的电话号码
      from: process.env.TWILIO_FROM_NUMBER, // 从 Twilio 获取的电话号码
    });
    console.log('Twilio response:', response); // 添加这行日志
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error('Error sending SMS:', error); // 修改这行日志
    res.status(500).json({ success: false, error: error.message });
  }
};
