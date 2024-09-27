# Blog-Website

Blog Website for BXTrack Solutions

## Live Links

- **Frontend**: https://blogvault-peach.vercel.app
- **Backend**: https://blogvault.fly.dev

## Features

- **CRUD Operations**: Users can create, view, update, and delete blog posts.
  - Only **logged-in users** can create blog posts and comments.
  - Only the **user who created the blog** can edit or delete it.
  - Only the **user who commented** can edit or delete their comment.
- **Authentication**: JWT-based user authentication.
- **Image Upload**: Images are stored in **Firebase Storage**, and the image link is stored in MongoDB.
- **Comments**: Add, edit, and delete comments on blog posts, with permissions based on the comment creator.
- **Pagination**: Paginate the list of blog posts.
- **Routing**: Different pages for home, post creation, post editing, and post details.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/Mominaliy/Blog-Website.git
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd frontend
   npm install
   cd ..
   cd backend
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `frontend` directory with the following variable:

   ```
   REACT_APP_API_URL=http://0.0.0.0:8080  # Use this when running locally
   # If not running locally, use the following:
   REACT_APP_API_URL=https://blogvault.fly.dev
   ```

4. Run the backend:

   ```bash
   cd backend
   nodemon index or node index.js
   ```

5. Run the frontend:

   ```bash
   cd frontend
   npm start
   ```

6. Access the application at `http://localhost:3000`.

### Authentication

- `POST /api/auth/register`: Create a new user and receive JWT.
- `POST /api/auth/login`: Log in a user and receive a JWT.

### Blog Posts

- `POST /api/posts/createPost`: Create a new blog post (requires authentication).
- `GET /api/posts/allPosts`: Get all blog posts with pagination.
- `GET /api/posts/trendingPost`: Get trending blog posts.
- `GET /api/posts/:id`: Get a single blog post by ID.
- `PUT /api/posts/:id`: Update a blog post (only by the user who created it, requires authentication).
- `DELETE /api/posts/:id`: Delete a blog post (only by the user who created it, requires authentication).

### Comments

- `POST /api/posts/addComment/:id`: Add a comment to a post (requires authentication).
- `DELETE /api/posts/deleteComment/:id/:commentId`: Delete a comment (only by the user who created it, requires authentication).

## App Structure Overview

- **Frontend (React)**

  - `src/components`: Contains components like `Navbar`, `Posts`, `PostTile`, `UserPopup` etc.
  - `src/pages`: Defines routing for Home, CreatePost, EditPost, and PostDetails pages.
  - `src/context`: Context providers for managing global state and providing access to authentication and posts data.
  - **Firebase Storage** integration for image uploads.

- **Backend (Express)**
  - `routes/`: Defines API routes for posts, and authentication.
  - `controllers/`: Contains logic for each route `authcontroller` and `postcontroller`.
  - `models/`: Mongoose models for Users and Posts

## Deployment

- **Frontend**: https://blogvault-peach.vercel.app
- **Backend**: https://blogvault.fly.dev
