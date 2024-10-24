import { Loader } from "@/components/loader/loader";
import { I18nProviderClient } from "@/locales/client";
import { type ReactElement, Suspense } from "react";

export default async function Layout(props: {
  params: Promise<{ locale: string }>;
  children: ReactElement;
}) {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  // This is where your authenticated app lives
  return (
    <I18nProviderClient locale={locale}>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </I18nProviderClient>
  );
}
