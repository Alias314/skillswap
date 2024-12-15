# SkillSwap

## About the Project
SkillSwap is a web-based platform that allows users to share and exchange skills through a simple note-sharing interface. Users can create, view, and manage their notes.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: PHP with MySQL (for database management and user authentication)
- **Development Tools**: Vite (for project setup and bundling)

## Setup and Installation

To get started with SkillSwap, follow these steps:

### Prerequisites
- Node.js (v14 or later)
- npm (comes with Node.js)
- XAMPP (to set up the Apache server and MySQL database)

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Alias314/skillswap.git

2. **Navigate to the project directory**:
   ```bash
   cd skillswap

3. **Install dependencies**:
   ```bash
   npm install

4. **Set up Firebase**:
- Open XAMPP and start the Apache and MySQL services
- Copy the backend files into the XAMPP htdocs directory
- Import the database schema into MySQL. The SQL file is located in /backend/databae/skillswap.sql. Make sure to name the database "skillswap" 
  
5. **Run the development server**:
   ```bash
   npm run dev

6. **Access the project**
   - Open your browser and navigate to http://localhost:5173

### User Login Credentials
1. **OmegaTest**
   - Email: user@gmail.com
   - Password: 123456
   - Role: User
2. **Admin**
   - Email: admin@gmail.com
   - Password: 123123
   - Role: Admin
