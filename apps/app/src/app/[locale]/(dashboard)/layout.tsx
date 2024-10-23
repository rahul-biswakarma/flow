import { I18nProviderClient } from "@/locales/client";
import type { ReactElement } from "react";

export default async function Layout(props: {
  params: Promise<{ locale: string }>;
  children: ReactElement;
}) {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  // This is where your authenticated app lives
  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
}
