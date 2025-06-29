# RentEase Server

Backend API server for the RentEase home rental application built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Property listing management
- Booking system
- Payment integration with Razorpay
- File upload capabilities
- RESTful API endpoints

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Razorpay
- **File Upload**: Multer with GridFS
- **Security**: bcryptjs for password hashing

## Prerequisites

- Node.js (version 16 or higher)
- MongoDB database
- Razorpay account (for payments)

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd rent_ease/server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NODE_ENV=development
```

4. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Properties

- `GET /properties` - Get all properties
- `POST /properties` - Create new property
- `GET /properties/:id` - Get property by ID
- `PUT /properties/:id` - Update property
- `DELETE /properties/:id` - Delete property

### Bookings

- `GET /bookings` - Get all bookings
- `POST /bookings` - Create new booking
- `GET /bookings/:id` - Get booking by ID
- `PUT /bookings/:id` - Update booking
- `DELETE /bookings/:id` - Delete booking

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user profile
- `DELETE /users/:id` - Delete user

### Payments

- `POST /api/razorpay` - Create Razorpay order
- `POST /api/payment/success` - Handle payment success

### Health Check

- `GET /health` - Server health status

## Deployment to Render

### 1. Prepare Your Repository

Make sure your code is pushed to a Git repository (GitHub, GitLab, etc.).

### 2. Create a Render Account

1. Go to [render.com](https://render.com)
2. Sign up for a free account
3. Connect your Git repository

### 3. Deploy the Web Service

1. Click "New +" and select "Web Service"
2. Connect your repository
3. Configure the service:
   - **Name**: `rent-ease-server` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose a paid plan)

### 4. Environment Variables

Add these environment variables in Render dashboard:

```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NODE_ENV=production
```

### 5. Database Setup

For production, consider using:

- **MongoDB Atlas** (cloud MongoDB service)
- **Render's PostgreSQL** (if you want to switch to PostgreSQL)

### 6. CORS Configuration

Update the CORS origin in `index.js` to include your frontend domain:

```javascript
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://your-frontend-domain.com"] // Replace with your actual frontend URL
        : ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
```

## Environment Variables

| Variable              | Description                          | Required |
| --------------------- | ------------------------------------ | -------- |
| `MONGO_URL`           | MongoDB connection string            | Yes      |
| `JWT_SECRET`          | Secret key for JWT tokens            | Yes      |
| `RAZORPAY_KEY_ID`     | Razorpay public key                  | Yes      |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key                  | Yes      |
| `NODE_ENV`            | Environment (development/production) | No       |
| `PORT`                | Server port (auto-set by Render)     | No       |

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to version control
2. **JWT Secret**: Use a strong, random secret key
3. **CORS**: Configure CORS properly for production
4. **Input Validation**: Validate all user inputs
5. **Rate Limiting**: Consider implementing rate limiting for production

## Troubleshooting

### Common Issues

1. **Port Issues**: Render automatically sets the PORT environment variable
2. **Database Connection**: Ensure your MongoDB connection string is correct
3. **CORS Errors**: Update CORS configuration for your frontend domain
4. **Environment Variables**: Double-check all environment variables are set in Render

### Logs

Check Render logs for debugging:

1. Go to your service dashboard
2. Click on "Logs" tab
3. Look for error messages and stack traces

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
