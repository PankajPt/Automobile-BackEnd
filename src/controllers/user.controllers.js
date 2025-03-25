import ApiResponse from "../utils/apiResponse.js"
import ApiError from "../utils/apiError.js"
import asyncHandler from "../utils/asyncHandler.js"
import logger from "../utils/logger.js"
import sendMail from "../utils/emailService.js"
import SendWhatsAppNotification from "../utils/smsService.js"

const submitEnquiryForm = asyncHandler(async (req, res) => {
    const { model, name, phone, email, address, message } = req.body

    if( !model || !name || !phone || !email ){
        logger.info('All fields [model, name, phone, email] are required.')
        return res
            .status(400)
            .json(new ApiError(400, 'All fields [model, name, phone, email] are required.'))
    }

    const mailStatus = await sendMail({ model, name, phone, receipentEmail: email, address, message, title: 'Thank You for Your Enquiry – We’ll Get Back to You Soon!' })
    if(!mailStatus.success){
        return res
            .status(mailStatus.statusCode || 500)
            .json(new ApiError(mailStatus.statusCode || 500, 'Something went wrong while sending email. Please try again.'))
    }

    logger.info(`Enquiry submitted successfully for [${email}]`)

    await SendWhatsAppNotification({ model, name, phone, email, address, message })

    return res
        .status(200)
        .json(new ApiResponse(200, mailStatus, 'Thank you for your enquiry. We have received your request and will get back to you soon.'))

})

const keepAlive = asyncHandler(async(req, res) => {
    const SEQ_NUM = String(req.params?.SEQ_NUM).trim()

    if (!SEQ_NUM){
        logger.warn(`[${new Date().toISOString()}] Heart_Beat_RES-[]: SENT OK`)
        return res
            .status(400)
            .json(new ApiResponse(400, {status: 'OK'}, 'SEQ_NUM is missing'))
    }
    logger.info(`[${new Date().toISOString()}] Heart_Beat_REQ-[${SEQ_NUM}]: RECEIVED`)
    logger.info(`[${new Date().toISOString()}] Heart_Beat_RES-[${SEQ_NUM}]: SENT OK`)    
    return res
        .status(200)
        .json(new ApiResponse(200, { SEQ_NUM, status: 'OK' }, `Server is up and running.`))
})

export {
    submitEnquiryForm,
    keepAlive
}