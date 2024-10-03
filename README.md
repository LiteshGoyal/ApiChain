# API Chaining Dashboard

This is a responsive web application built to demonstrate the ability to handle complex API interactions, including both GET and POST requests. The dashboard allows chaining multiple API calls, where the response from one API is used as a parameter  of subsequent API requests.

Demo Video[https://drive.google.com/file/d/1OVtf64IJE3xFNrGXyQ0JSB84zP2YzwoV/view?usp=sharing]
## Table of Contents
- Setup Instructions
- Approach
- Assumptions and Decisions
- Features
- Known Issues
- Setup Instructions

## 1. Clone the Repository
```
git clone <repository-url>
cd <repository-folder>
```
## 2. Install Dependencies
```
npm install
```
## 3. Start the Development Server
```
npm start
```
The application will start on http://localhost:3000.

## 4. Build for Production
To create a production build, run:
```
npm run build
```

## 5. Tailwind CSS Setup
Tailwind CSS has already been configured and is included in the tailwind.config.js file. Ensure you have run npm install to install all necessary dependencies for Tailwind.

## 6. Running the Project
You can run the project locally on your machine using the following command:
```
npm start
```

# Approach
This project demonstrates API chaining using React.js for the frontend, with Tailwind CSS for styling. It integrates with three REST APIs:

- Get Users List - GET /users
- Create New Post - POST /posts
- Get Comments by Post - GET /comments?postId={postId}

### The API chaining works by:

Allowing the user to select a user, create a post, and fetch comments related to that post.
The created post is either new or fetched from the existing posts using its title and body, ensuring that no duplicate posts are created.

## Key Components:
- APIChainBuilder.js: Core component that handles API chaining logic.
- State Management: Controlled using React hooks such as useState and useEffect.
- UI/UX Enhancements: Tailwind CSS is used for styling the interface, ensuring responsiveness and a clean layout.
- Loading States and Error Handling
- Loading indicators are shown while API requests are in progress.
- Appropriate error messages are displayed if any API fails.
- Icon Integration
- Data Transformation: In this project, it is assumed that the post ID from the created post is required to fetch comments, making it essential for the post to be created before comments can be fetched.
- Mock APIs: The JSONPlaceholder APIs were used as mock endpoints, assuming the structure of responses and requests would resemble real-world APIs.
- POST Title Uniqueness: To prevent duplication of posts, it was assumed that post titles should be unique. If a post with the same title exists, the application uses that existing post instead of creating a new one.
- Minimal Styling: Tailwind CSS was used for minimal styling while ensuring the layout remains responsive and visually appealing.

# Features
- Responsive UI: The layout adapts well to different screen sizes.
- User Selection: Allows users to select a user for whom to create a post.
- API Chaining: The response from one API (post ID) is used as input for the next API call (fetching comments).
- Data Visualization: Displays the flow of data between the chained APIs and renders user posts and their related comments.
- Loading States: Implemented for a better user experience during API calls.
- Error Handling: Displays error messages in case of failures in API requests.
- Post Creation: Prevents duplicate posts by checking existing posts before creating new ones.

# Conclusion
This project successfully demonstrates the ability to chain multiple API calls together, handle GET/POST requests, and manage state effectively in a React.js application. It uses Tailwind CSS for responsive, modern design and includes basic error handling for a smoother user experience.