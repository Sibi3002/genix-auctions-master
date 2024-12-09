# Auction Platform

This project is a full-stack web application designed to facilitate online auctions. It features user authentication, auction item management, bidding functionality, and a user-friendly interface for managing and viewing bids. The project showcases the ability to design, implement, and document a complete web application ensuring user engagement and a smooth auction experience.

## Table of Contents

- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Technologies Used](#technologies-used)
- [Project Planning](#project-planning)
- [Requirements Analysis](#requirements-analysis)
- [System Design](#system-design)
- [Implementation](#implementation)
- [Testing](#testing)
- [Deployment](#deployment)
- [User Documentation](#user-documentation)
- [Maintenance and Future Enhancements](#maintenance-and-future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/auction-platform.git
   ```

2. Change to the project directory:

   ```bash
   cd auction-platform
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder Structure

```plaintext
auction-platform/
├── api/
│   ├── auctions/
│   │   ├── [id].js
│   │   ├── close-auction.js
│   │   ├── delete-auction.js
│   │   ├── dislike-auction.js
│   │   ├── like-auction.js
│   ├── auth/
│   │   ├── [...nextauth].js
│   ├── bid.js
│   ├── bidding-history.js
│   ├── get-auction.js
│   ├── get-reviews.js
│   ├── hello.js
│   ├── liked-auctions.js
│   ├── login.js
│   ├── logout.js
│   ├── my-auction.js
│   ├── review.js
│   ├── signup.js
│   ├── update-item.js
├── components/
│   ├── AuctionCard.jsx
│   ├── BidModal.jsx
│   ├── DropDownMenu.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── ItemTile.jsx
│   ├── Logo.jsx
│   ├── NavBar.jsx
│   ├── ReviewModal.jsx
│   ├── Seo.jsx
│   ├── SuccessModal.jsx
│   ├── UserAvatar.jsx
│   ├── WinnerModal.jsx
├── dbconfig/
│   ├── dbconfig.js
├── helper/
│   ├── mailer.js
├── hooks/
│   ├── useCurrentRoute.js
│   ├── useUser.js
├── models/
│   ├── AuctionItemModel.jsx
│   ├── UserModel.jsx
├── pages/
│   ├── api/
│   ├── auth/
│   │   ├── create-auction.jsx
│   │   ├── index.jsx
│   │   ├── my-auctions.jsx
│   │   ├── my-bids.jsx
│   │   ├── profile/
│   ├── index.js
│   ├── login.jsx
│   ├── signup.jsx
│   ├── _app.js
│   ├── _document.js
│   ├── _error.js
│   ├── biddings.jsx
│   ├── review.jsx
│   ├── services/
│   ├── styles/
│   │   ├── globals.css
│   ├── assets/
│   │   ├── index.png
│   │   ├── login.png
│   │   ├── logo.png
│   │   ├── signup.png
│   │   ├── success.png
│   ├── server/
│   │   ├── auth.js
│   ├── routes.js
```

### Important Files and Directories

- **pages/**: All the pages for the application.
- **components/**: Reusable React components.
- **api/**: API routes.
- **styles/**: Global styles with Tailwind CSS.
- **dbconfig/**: Database configuration.
- **helper/**: Helper functions.
- **hooks/**: Custom hooks.
- **models/**: Data models.

## Available Scripts

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm start`: Starts the production build.
- `npm run lint`: Runs the linter.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [NextAuth](https://next-auth.js.org/)

## Project Planning

### Project Plan

A detailed timeline with key milestones including initial setup, front-end and back-end development, testing, and deployment.

### Tools and Technologies

- **Front-End**: Next.js, Tailwind CSS
- **Back-End**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Authentication**: NextAuth, bcrypt

### Risk Management

- **Identified Risks**:

  - Delays in development
  - Integration issues
  - Security vulnerabilities

- **Mitigation Strategies**:
  - Regular progress checks
  - Thorough testing
  - Secure coding practices

## Requirements Analysis

### Functional Requirements

- User registration and authentication
- Auction item creation, viewing, updating, and deleting
- Bidding on auction items
- Viewing current highest bid and bid history
- Notifications for outbid users

### Non-Functional Requirements

- Responsive and user-friendly UI
- Secure handling of user data
- Efficient database queries and operations

## System Design

### Architecture

The application follows a Model-View-Controller (MVC) architecture to ensure a clear separation of concerns and enhance modularity.

### Database Design

Uses MongoDB to store information about users, auction items, and bids. Managed via schemas/models using Mongoose.

#### ER Diagram

- **Users**: `{ userId, username, email, password }`
- **Auction Items**: `{ itemId, title, description, startingBid, currentHighestBid, bidHistory, endDate, userId }`
- **Bids**: `{ bidId, itemId, userId, bidAmount, bidTime }`

## Implementation

### Technologies Used

- **Next.js**: Server-side rendering and static site generation.
- **TailwindCSS**: Utility-first CSS framework.
- **MongoDB**: NoSQL database.
- **NextAuth**: Authentication library using JWT.
- **Node.js with Express**: Backend framework for building RESTful APIs.

### Justification for Different Tech Stack

Next.js was chosen over React for its built-in server-side rendering features, improving performance and SEO. MongoDB's schema-less structure suits the dynamic and scalable data needs of the auction platform. NextAuth simplifies secure authentication implementation. TailwindCSS allows rapid and consistent styling.

### Development Process

- **Methodology**: Agile methodology with iterative development and regular feedback.
- **Tools**: Git for version control.

### Modules Developed

- User authentication (registration, login)
- Auction item management (CRUD operations)
- Bidding functionality

## Testing

### Test Plan

- Unit testing
- Integration testing
- System testing
- User acceptance testing

### Test Cases

- Registration and login functionality
- CRUD operations for auction items
- Bidding process and notifications

## Maintenance and Future Enhancements

### Maintenance Plan

Regular updates, backups, and monitoring.

### Future Enhancements

Adding features like auto-bidding, advanced search and filtering, and recommendation systems.

---
