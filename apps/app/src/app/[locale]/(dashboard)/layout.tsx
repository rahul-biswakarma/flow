import { I18nProviderClient } from "@/locales/client";
import type { ReactElement } from "react";

export default function Layout({
  params: { locale },
  children,
}: { params: { locale: string }; children: ReactElement }) {
  // This is where your authenticated app lives, add a sidebar, header etc.
  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
}
