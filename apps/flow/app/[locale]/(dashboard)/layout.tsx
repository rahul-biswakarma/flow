import { FlowLoader } from "@flow/components";
import { I18nProviderClient } from "@flow/locales/client";
import { type ReactElement, Suspense } from "react";

export default async function Layout(props: {
  params: Promise<{ locale: string }>;
  children: ReactElement;
}) {
  const params = await props.params;

  const { locale } = params;
  const { children } = props;

  return (
    <I18nProviderClient locale={locale ?? "en"}>
      <Suspense fallback={<FlowLoader />}>{children}</Suspense>
    </I18nProviderClient>
  );
}
