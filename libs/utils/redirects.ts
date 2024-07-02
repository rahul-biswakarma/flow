import { redirect, RedirectType } from 'next/navigation';

import { NextAuthConstants } from '../constants';

export const LoginRedirect = () => {
  redirect(NextAuthConstants.SignIn, RedirectType.replace);
};

export const ProjectRedirect = (projectSlug: string) => {
  redirect(`/${projectSlug}`, RedirectType.push);
};

export const ProjectSelectionRedirect = () => {
  redirect('/project-selection', RedirectType.replace);
};
