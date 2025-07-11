# Stampt Backend API

A Node.js backend API for the Stampt application built with Express.js and MongoDB.

## Features

- User authentication and management
- Base scanning system (6 bases)
- Team assignment
- Real-time progress tracking
- RESTful API endpoints

## Prerequisites

- Node.js >= 14.20.1
- npm >= 6.0.0
- MongoDB database (local or cloud)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stampt-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
```

Edit the `.env` file with your configuration:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
PORT=4000
NODE_ENV=production
```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Import Users from CSV
```bash
npm run import
```

## API Endpoints

### Authentication
- `POST /api/login` - Login with userId
- `GET /api/user/:userId` - Get user by userId
- `GET /api/users` - Get all users

### Base Scanning
- `POST /api/scan` - Scan a base (requires userId and base number 1-6)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | Required |
| `PORT` | Server port | 4000 |
| `NODE_ENV` | Environment | production |

## Deployment

### Heroku
1. Create a new Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git:
```bash
git push heroku main
```

### Railway
1. Connect your GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically

### Vercel
1. Import your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically

### Docker
```bash
docker build -t stampt-backend .
docker run -p 4000:4000 --env-file .env stampt-backend
```

## Project Structure

```
├── backend/
│   ├── models/
│   │   └── User.js          # User model schema
│   ├── server.js            # Main server file
│   └── import_users.js      # CSV import utility
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Database Schema

### User Model
- `userId` (String, required, unique) - User identifier
- `name` (String, required) - User's full name
- `team` (Number, required) - Team assignment (1-10)
- `base1-base6` (Number, default: 0) - Base completion status
- `time1-time6` (Date) - Timestamps for base completions
- `total` (Number, default: 0) - Total completed bases

## License

ISC "# demoscan" 
