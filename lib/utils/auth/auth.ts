import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import { prisma } from '../db';

import authConfig from './auth.config';

const { handlers, auth }: { handlers: any; auth: any } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
      }
      if (trigger === 'signUp') {
        token.isNewUser = true;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.isNewUser = token.isNewUser as boolean;

      return session;
    },
  },
  session: { strategy: 'jwt' },
  ...authConfig,
});

export { auth, handlers };
