# Community Dashboard

Welcome to the Community Dashboard project! This React-based application provides a comprehensive overview of community statistics, including user activity, messages, and more. It integrates various charts and visualization tools to display key metrics and user data effectively.

## Example User ID

 **64b2d587d8f87c15e6cf8f90** - **64b2d587d8f87c15e6cf8fa6**

## Features

- **User Statistics**: Display total, active, and inactive members.
- **Data Visualization**: Interactive charts including Bar, Pie, Line, and Radar charts.
- **Real-time Search**: Search for user details by ID with real-time feedback.
- **Top Contributors**: List of top contributors based on message count.

## Technologies Used

- **Frontend**: React, Chart.js, Tailwind CSS, React Spring
- **Backend**: Express.js, Node.js
- **Database**: MongoDB

## Getting Started

### Prerequisites

- **Node.js** (version 14 or later)
- **npm** (or **yarn**)

### Installation

1. **Clone the repository**:
    
    
    `git clone https://github.com/manicdon7/community.git cd community-dashboard`
    
2. **Install dependencies**:
    
    
    `npm install`
    
    or
    
    
    `yarn install`
    

### Configuration

#### Create a `.env` File

Create a `.env` file in the root directory of the project and add the following variable for MongoDB connection:

en

`DB_URI=mongodb://your_mongodb_uri_here`

Replace `your_mongodb_uri_here` with your actual MongoDB URI.

### Running the Project

1. **Start the development server**:
    
    
    `npm start`
    
    or
    
    
    `yarn start`
    
    This will start the React development server and open the dashboard in your default browser.
    
2. **Build for production** (optional):
    
    
    `npm run build`
    
    or
    
    
    `yarn build`
    
    This will create a production-ready build in the `build` folder.
    

### API Endpoints

- **GET** `/api/users`: Fetch all users.
- **GET** `/api/users/:id`: Fetch details of a specific user by ID.

### Contributing

1. **Fork the repository**.
    
2. **Create a new branch**:
    
    
    `git checkout -b feature/your-feature-name`
    
3. **Commit your changes**:
    
    
    `git commit -m "Add your commit message here"`
    
4. **Push to the branch**:
    
    
    `git push origin feature/your-feature-name`
    
5. **Create a pull request**.
    

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Contact

For any questions or issues, please contact manikandan05082003@gmail.com.