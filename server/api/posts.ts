// server/api/posts.ts
import { db } from '~/server/db';
import { posts } from '~/server/db/schema';
import { desc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  // Handle GET request
  if (event.node.req.method === 'GET') {
    const allPosts = await db.query.posts.findMany({
      orderBy: [desc(posts.createdAt)],
    });
    return allPosts;
  }

  // Handle POST request
  if (event.node.req.method === 'POST') {
    const body = await readBody(event);

    if (!body.title) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request: Title is required',
      });
    }

    const newPost = await db.insert(posts).values({
      title: body.title,
      content: body.content,
    }).returning(); // .returning() sends the created post back

    return newPost[0];
  }
});