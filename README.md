# 🛠️ Automobile – Backend

This is the **backend** service for the **Automobile** online booking system. It powers the form submission, handles incoming booking requests, sends confirmation **emails** and **SMS messages**, and optionally stores booking data. Built using **Node.js**, **Express.js**, **Nodemailer**, and **Twilio**, it provides robust and scalable server functionality.

---

## 🧰 Tech Stack

- **Node.js** – Server runtime
- **Express.js** – REST API framework
- **Nodemailer** – Email sending utility
- **Twilio** – SMS notification service
- **dotenv** – Environment variable management
- **body-parser** – Middleware for request parsing
- **cors** – Enables frontend-backend communication

---

## ✨ Features

- Receives booking form data via POST request
- Sends email confirmation using Gmail SMTP
- Sends SMS confirmation using Twilio
- Logs all requests and responses
- Environment-based configuration via `.env`

---

## 📦 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sp-automobile-backend.git
cd sp-automobile-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables
```env
PORT=5000

# Email Setup
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password

# Twilio Setup
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Optional MongoDB (if used)
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/automobile

```

## ▶️ Run the Server

```
node index.js
```

## 📡 API Endpoint

### ✅ Request Body (JSON):
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "vehicle": "Hyundai i20",
  "serviceDate": "2025-05-20",
  "notes": "Need brake inspection"
}
```

### 🔁 Server Actions:

- Sends confirmation email to email
- Sends SMS to phone
- Returns success response to frontend

### ✅ Success Response:

```json
{
  "message": "Booking received and confirmation sent"
}
```

## 📁 Folder Structure

```
sp-automobile-backend/
├── controllers/
│   └── bookingController.js     # Core booking logic
├── routes/
│   └── bookingRoutes.js         # API route handler
├── utils/
│   ├── mailer.js                # Nodemailer config
│   └── smsSender.js             # Twilio SMS handler
├── .env                         # Environment config
├── index.js                     # Entry point
├── package.json
└── README.md
```

## 🗃️ Dependencies

```json
"dependencies": {
  "cors": "^2.8.5",
  "dotenv": "^16.1.4",
  "express": "^4.18.2",
  "nodemailer": "^6.9.8",
  "twilio": "^4.15.2"
}
```

### 🔧 Customization

- Edit mailer.js to change email templates
- Edit smsSender.js to customize the SMS message format
- If using a database, connect it in index.js or bookingController.js

### 🔐 Security Tips

- Never commit .env or credentials to GitHub
- Use App Passwords for Gmail and secure your Twilio keys
- Use HTTPS in production
- Validate inputs to prevent abuse

## 🚀 Deployment
```
npm install
node index.js
```

## 🧪 Testing
- Use Postman or cURL to test your endpoint:
  
```bash
curl -X POST http://localhost:5000/api/bookings \
-H "Content-Type: application/json" \
-d '{
  "name": "John",
  "email": "john@example.com",
  "phone": "+1234567890",
  "vehicle": "Toyota Corolla",
  "serviceDate": "2025-05-21",
  "notes": "Tyre replacement"
}'
```

## 📄 License

This project is licensed under the MIT License.

```
Let me know if you want `.env.sample` files, backend error handling improvements, or a MongoDB version added.
```
