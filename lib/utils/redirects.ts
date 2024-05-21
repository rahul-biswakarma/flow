import { redirect, RedirectType } from 'next/navigation';

import { NextAuthConstants } from '../constants';

export const LoginRedirect = () => {
  redirect(NextAuthConstants.SignIn, RedirectType.replace);
};

export const WorkspaceRedirect = (workspaceId: string) => {
  redirect(`/${workspaceId}`, RedirectType.push);
};
