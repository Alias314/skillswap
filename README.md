# SkillSwap

## About the Project
SkillSwap is a web-based platform that allows users to share and exchange skills through a simple note-sharing interface. Users can create, view, and manage their notes.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Firebase (Firestore for database and Firebase Authentication for user management)
- **Development Tools**: Vite (for project setup and bundling)

## Setup and Installation

To get started with SkillSwap, follow these steps:

### Prerequisites
- Node.js (v14 or later)
- npm (comes with Node.js)

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
- Create a Firebase project at Firebase Console.
- Obtain your Firebase configuration and update src/firebase.js with your Firebase credentials (will create a shared database in the future but for now this will do).

5. **Run the development server**:
   ```bash
   npm run dev

