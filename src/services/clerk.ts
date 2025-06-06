import { db } from '@/drizzle/db';
import { UserRole, UserTable } from '@/drizzle/schema';
import { getUserIdTag } from '@/features/users/db/cache';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import { redirect } from 'next/navigation';

const client = await clerkClient();

// export async function getCurrentUser({ allData = false } = {}) {
//   const { userId, sessionClaims, redirectToSignIn } = await auth();

//   if (userId != null && sessionClaims.dbId == null) {
//     redirect('/api/clerk/syncUsers');
//     // redirect('');
//   }

//   return {
//     clerkUserId: userId,
//     userId: sessionClaims?.dbId,
//     role: sessionClaims?.role,
//     user:
//       allData && sessionClaims?.dbId != null
//         ? await getUser(sessionClaims.dbId)
//         : undefined,
//     redirectToSignIn,
//   };
// }

export async function getCurrentUser({ allData = false } = {}) {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  if (userId != null && sessionClaims?.dbId == null) {
    // Query user from DB and sync to Clerk metadata
    const dbUser = await db.query.UserTable.findFirst({
      where: eq(UserTable.clerkUserId, userId),
    });

    if (dbUser) {
      await syncClerkUserMetadata(dbUser);
    }

    // Re-run auth() if needed (because metadata is now updated)
    return {
      clerkUserId: userId,
      userId: dbUser?.id,
      role: dbUser?.role,
      user: allData ? dbUser : undefined,
      redirectToSignIn,
    };
  }

  return {
    clerkUserId: userId,
    userId: sessionClaims?.dbId,
    role: sessionClaims?.role,
    user:
      allData && sessionClaims?.dbId != null
        ? await getUser(sessionClaims.dbId)
        : undefined,
    redirectToSignIn,
  };
}

export function syncClerkUserMetadata(user: {
  id: string;
  clerkUserId: string;
  role: UserRole;
}) {
  return client.users.updateUserMetadata(user.clerkUserId, {
    publicMetadata: {
      dbId: user.id,
      role: user.role,
    },
  });
}

async function getUser(id: string) {
  'use cache';
  cacheTag(getUserIdTag(id));
  console.log('Called');

  return db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
  });
}
