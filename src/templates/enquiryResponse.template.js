export default function getEmailTemplate(name, address="", message="", model) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Enquiry Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: #007bff;
                color: #ffffff;
                padding: 15px;
                text-align: center;
                font-size: 20px;
                border-radius: 10px 10px 0 0;
            }
            .content {
                padding: 20px;
                font-size: 16px;
                color: #333333;
            }
            .footer {
                text-align: center;
                padding: 10px;
                font-size: 14px;
                color: #777777;
            }
            .info {
                background: #f9f9f9;
                padding: 10px;
                border-left: 5px solid #007bff;
                margin: 10px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">Thank You for Your Enquiry</div>
            <div class="content">
                <p>Dear <strong>${name}</strong>,</p>
                <p>Thank you for your enquiry. We have received your request and will get back to you soon.</p>
                <div class="info">
                    <p><strong>Model:</strong> ${model}</p>
                    <p><strong>Address:</strong> ${address}</p>
                    <p><strong>Message:</strong> ${message}</p>
                </div>
                <p>We appreciate your interest and look forward to assisting you.</p>
                <p>Best Regards,<br>Automobile Team</p>
            </div>
            <div class="footer">&copy; 2025 Automobile Company. All rights reserved.</div>
        </div>
    </body>
    </html>
    `;
}
