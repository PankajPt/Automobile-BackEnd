import twilio from 'twilio';
import logger from './logger.js';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export default async function SendWhatsAppNotification(userDetails){
    try {
        const response = await client.messages.create({
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+918108300397',
        body: `Enquiry received from [${userDetails.phone}]. \nDetails-\n\tName: ${userDetails.name},\n\tEmail: ${userDetails.email},\n\tAddress: ${userDetails.address},\n\tModel: ${userDetails.model}.\n\tMessage: ${userDetails.message}`
        })

        logger.info(`Enquiry received from [${userDetails.phone}]. \nDetails-\n\tName: ${userDetails.name},\n\tEmail: ${userDetails.email},\n\tAddress: ${userDetails.address},\n\tModel: ${userDetails.model}.\n\t${userDetails.message}`);
        return { success: true, messageId: response.sid };
    } catch (error) {
      const errorData = {
        errorName: error?.name,
        errorMessage: error?.message
      }
      logger.error(`WhatsApp Message Error:[${userDetails.phone}]`, errorData);
      return { success: false, error: error.message };
    }
}
