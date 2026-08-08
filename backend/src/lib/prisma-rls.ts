import { prisma } from "./prisma";

/**
 * Execute a Prisma operation with RLS context
 * Sets the app.user_id session variable before executing the operation
 * This allows PostgreSQL RLS policies to enforce row-level access
 */
export async function withRLSContext<T>(
  userId: string,
  operation: () => Promise<T>
): Promise<T> {
  try {
    // Set the user ID in the session for this connection
    await prisma.$executeRawUnsafe(`SELECT set_config('app.user_id', $1, false)`, userId);

    // Execute the operation
    const result = await operation();

    return result;
  } catch (error) {
    // Clear the context on error
    await prisma.$executeRawUnsafe(`SELECT set_config('app.user_id', '', false)`);
    throw error;
  }
}

/**
 * Validate user ownership of a resource
 * This provides application-level protection in addition to RLS
 */
export async function validateUserOwnership(
  userId: string,
  resourceType: "order" | "marketer",
  resourceId: string
): Promise<boolean> {
  if (resourceType === "order") {
    const order = await prisma.order.findUnique({
      where: { id: resourceId },
      select: { userId: true },
    });
    return order?.userId === userId;
  }

  if (resourceType === "marketer") {
    const marketer = await prisma.marketer.findUnique({
      where: { id: resourceId },
      select: { userId: true },
    });
    return marketer?.userId === userId;
  }

  return false;
}

/**
 * Check if user has admin role
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  return user?.role === "admin";
}
