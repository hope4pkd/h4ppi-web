import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { hasSupabasePublicConfig } from "@/lib/env";

export async function getSupabaseServerClient() {
  if (!hasSupabasePublicConfig()) return null;

  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (items) => {
          try {
            items.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Components cannot always write cookies. Middleware or a
            // mutation route refreshes sessions when cookie writes are needed.
          }
        },
      },
    },
  );
}
