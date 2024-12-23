# **Discussify**  
> A Reddit-inspired discussion platform built with the MERN (MongoDB, Express.js, React, Node.js) stack.

## **Overview**  
Discussify is a modern and feature-rich social platform for creating, sharing, and discussing posts. It offers functionalities like user authentication, post creation, commenting, voting, and a user-friendly interface, all containerized using Docker for seamless deployment and scaling.

---

## **Features**  

### **User Authentication**  
- **Registration**: Create an account to join the Discussify community.  
- **Login**: Secure login using email and password.  
- **JWT-based session management**: Ensures secure and stateless authentication.  
- **Password Encryption**: User passwords are securely stored using hashing techniques.  

### **User Profiles**  
- View and customize your profile.  
- Update your display name and profile picture.  
- View activity history such as posts and comments.

### **Posts**  
- **Create, Read, Update, Delete (CRUD)**: Fully manage posts on the platform.  
- **Upvote/Downvote**: Interact with posts by voting on their quality or relevance.  
- **Commenting**: Share your thoughts and engage in discussions on posts.

### **Discussion Boards**  
- Organized discussions under topic-specific boards.  
- Board moderation for spam and inappropriate content.  

### **Responsive Design**  
- Fully responsive design for a seamless experience across devices.

---

## **Technologies Used**

### **Frontend**
- **React.js**: User interface development.
- **Redux**: State management.
- **CSS Modules**: Styling components.

### **Backend**
- **Node.js**: Server-side runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user and post data.
- **Mongoose**: Object data modeling (ODM) for MongoDB.

### **Other Tools**
- **Docker**: Containerization for deployment.
- **JWT**: Secure authentication.
- **Bcrypt**: Password hashing.

---

## **Installation and Setup**  

### **Prerequisites**  
Ensure you have the following installed on your machine:
- **Node.js**  
- **MongoDB**  
- **Docker**  

---

### **Backend Setup**  

1. Navigate to the backend directory:
   ```bash
   cd backend
2. Install backend dependencies:
   ```bash
   npm install 
3. Start the backend server :
   ```bash
   npm start

---

### **Frontend Setup**  

1. Open a new teminal.
2. Navigate to the frontend directory:
   ```bash
   cd ../frontend
3. Install frontend dependencies:
   ```bash
   npm install 
4. Start the frontend development server:
   ```bash
   npm start

---

### **Docker Setup**  

1. Open a new teminal.
2. Build and run the Docker containers:
   ```bash
   docker-compose up --build
3. Access Discussify at http://localhost:3000.


