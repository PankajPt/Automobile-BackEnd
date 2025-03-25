import { SENDER_NAME, BREVO_URI } from '../config/constants.js'
import axios from 'axios'
import getEmailTemplate from '../templates/enquiryResponse.template.js'
import { logger } from './logger.js'
// npm install axios

const senderMail = process.env.AUTOMOBILE_EMAIL
const API_KEY = process.env.BREVO_API_KEY

const sendMail = async function(emailData){
    // emailData obj expects: receipentEmail, name, message, address, model

    const data = {
        sender: {
            email: senderMail,
            name: SENDER_NAME
        },
        to: [{
            email: emailData?.receipentEmail,
            name: emailData?.name
        }],
        cc: [{
            email: senderMail,
            name: SENDER_NAME
        }],
        subject: emailData?.title,
        htmlContent: getEmailTemplate(emailData.name, emailData?.address, emailData?.message, emailData.model)
    }

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'api-key': API_KEY
        }
    }
    
    try {
        const response = await axios.post(BREVO_URI, data, config)
        logger.info(response)
        const responseData = {
            statusCode: response.status,
            message: response.statusText,
            success: true
        }
        logger.info(`[${emailData?.receipentEmail}]`, responseData)
        return responseData
    } catch (error) {
        const errorData = {
            name: error?.name || 'UNKNOWN',
            statusCode: error?.status || error.response?.data?.code || 500,
            message: error?.message || error.response?.data?.message || 'Something went wrong while sending email, please try again.',
            success: false
        }
        logger.error(emailData?.receipentEmail, errorData)
        return errorData
    }
}

export default sendMail