import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      isNewUser: boolean;
    };
    organization?: {
      id: string;
      slug: string;
    };
  }
}
