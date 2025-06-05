import { PrismaClient } from '@prisma/client/.prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Check if Prisma is enabled via runtime config
  const prismaEnabled = useRuntimeConfig().public.prismaEnabled;

  if (!prismaEnabled) {
    console.warn('Prisma is disabled. Skipping database query for /api/users.');
    throw createError({
      statusCode: 503, // Service Unavailable
      statusMessage: 'Database service is not enabled.',
    });
  }

  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error: any) {
    console.error('Error fetching users:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch users.',
      data: error.message, // Optionally include error details in development
    });
  }
});
