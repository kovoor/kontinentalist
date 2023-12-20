# Next.js Project with REST API and Client-Side Pages

This project demonstrates the use of Next.js with REST API endpoints and client-side rendering using React.

![Alt Text](./public/demo.gif)

## Technologies Used

- Next.js (Pages Router)
- TypeScript
- Tailwind CSS
- Shadcn UI

## Setup

1. Clone the repository:

```
git clone <repository-url>
```

2. Install dependencies:

```
npm install
```

3. Run the development server:

```
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints

- `GET /api/posts`: Fetches all posts.
- `GET /api/posts/{id}`: Fetches a post with the specified ID.
- `POST /api/posts`: Creates a new post.
- `PATCH /api/posts/{id}`: Updates a post with the specified ID.
- `DELETE /api/posts/{id}`: Deletes a post with the specified ID.

## Client-Side Pages

- The homepage displays a list of stories with pagination support.

## Testing

- Use `curl` or Postman to test the API endpoints.
- Navigate the web pages to see client-side rendering in action.

## Notes

- The project uses an in-memory array to store posts data, which will be reset upon server restart.
- **Please take note** the way Next.js stores data can be different with API endpoints hence why the **postsStore.ts** exists (as a minimal database) to test working with /posts and /posts/[id] endpoints. In a real production environment, a database is used in place.

## Contact

For any queries, please reach out to me via my email or @jakekovoor on X (Twitter).
