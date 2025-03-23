import ApiResponse from "../utils/apiResponse"
import ApiError from "../utils/apiError"
import asyncHandler from "../utils/asyncHandler"

const submitEnquiryForm = asyncHandler(async (req, res) => {
    const { model, name, phone, email, address, message } = req.body

    if( !model || !name || !phone || !email ){
        return res
            .status(422)
            .json(new ApiError(422, 'All fields [model, name, phone, email] are required.'))
    }


})

export {
    submitEnquiryForm
}