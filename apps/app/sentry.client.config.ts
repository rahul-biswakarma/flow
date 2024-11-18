import * as Sentry from "@sentry/nextjs";
import { supabaseIntegration } from "@supabase/sentry-js-integration";
import { createSupabaseClient } from "@v1/supabase/client";

const client = createSupabaseClient();

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1,
  debug: false,
  enabled: process.env.NODE_ENV === "production",
  integrations: [
    supabaseIntegration(client, Sentry, {
      tracing: true,
      breadcrumbs: true,
      errors: true,
    }),
  ],
});
