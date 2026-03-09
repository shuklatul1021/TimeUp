# TimeUp

A modern, full-stack uptime monitoring application that tracks website availability and performance across multiple regions.

## Features

- **Website Monitoring** - Track uptime and response times for your websites
- **Multi-Region Checks** - Monitor from multiple geographic regions
- **User Authentication** - Secure registration and login with JWT tokens
- **Dashboard** - Real-time overview of all monitored websites
- **Incident Management** - Track and manage downtime incidents
- **Status Pages** - Public status pages for your services
- **Alerts** - Get notified when your websites go down

## Tech Stack

### Backend (Rust)

- **Framework**: [Poem](https://github.com/poem-web/poem) - A fast async web framework
- **Database**: PostgreSQL with [Diesel ORM](https://diesel.rs/)
- **Authentication**: JWT tokens via `jsonwebtoken`
- **Runtime**: Tokio async runtime

### Frontend (React + TypeScript)

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Routing**: React Router DOM
- **Animations**: Framer Motion

## Project Structure

```
Better-Up-Time/
├── backend/
│   ├── api/          # REST API server (Poem)
│   ├── producer/     # Background job producer
│   ├── store/        # Database layer (Diesel)
│   └── worker/       # Background job worker
├── frontend/         # React SPA
└── test/             # Integration tests
```

## Getting Started

### Prerequisites

- Rust (latest stable)
- Node.js 18+
- PostgreSQL 14+

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Set up the database:

   ```bash
   # Install Diesel CLI if not already installed
   cargo install diesel_cli --no-default-features --features postgres

   # Run migrations
   cd store
   diesel migration run
   ```

3. Run the API server:

   ```bash
   cargo run -p api
   ```

   The server will start on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Endpoint               | Description              |
| ------ | ---------------------- | ------------------------ |
| POST   | `/auth/register`       | Register a new user      |
| POST   | `/auth/log-in`         | Authenticate user        |
| GET    | `/website/:website_id` | Get website details      |
| POST   | `/website`             | Add a website to monitor |

## Database Schema

- **user** - User accounts
- **website** - Monitored websites
- **website_tick** - Individual monitoring results
- **region** - Geographic monitoring regions

## Development

### Running Tests

```bash
# Backend tests
cd backend
cargo test

# Frontend tests
cd frontend
npm run test
```

### Building for Production

```bash
# Backend
cd backend
cargo build --release

# Frontend
cd frontend
npm run build
```

## License

MIT
