import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      isNewUser: boolean;
    };
    project?: {
      id: string;
      slug: string;
    };
  }
}
