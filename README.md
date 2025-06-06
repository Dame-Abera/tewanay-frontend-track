# Tewanay Store - E-commerce Platform

A modern e-commerce platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

- User Authentication
- Shopping Cart Functionality
- Responsive Design
- Modern UI with Tailwind CSS
- Real-time Cart Updates
- User Profile Management

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js
- **State Management:** Zustand
- **Icons:** React Icons
- **Package Manager:** npm/yarn

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Git

## Getting Started

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd tewanay-frontend-track
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add the following:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
├── services/        # API services
└── store/           # State management
```

## Key Features Implementation

### Authentication
- Secure user authentication using NextAuth.js
- Protected routes
- User session management

### Shopping Cart
- Real-time cart updates
- Persistent cart state
- Item quantity management

### UI/UX
- Responsive design
- Modern and clean interface
- Intuitive navigation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- Your Name - Initial work

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All contributors who have helped shape this project
