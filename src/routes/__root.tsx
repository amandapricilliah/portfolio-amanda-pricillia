import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { reportLovableError } from "../lib/lovable-error-reporting";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl italic text-text-primary">
          404
        </h1>

        <h2 className="mt-4 text-xl font-semibold text-text-primary">
          Page not found
        </h2>

        <p className="mt-2 text-sm text-muted">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-text-primary px-5 py-2.5 text-sm font-medium text-bg transition hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);

  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, {
      boundary: "tanstack_root_error_component",
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-text-primary">
          This page didn&apos;t load
        </h1>

        <p className="mt-2 text-sm text-muted">
          Try refreshing or head back home.
        </p>

        <div className="mt-6 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-text-primary px-5 py-2.5 text-sm font-medium text-bg"
          >
            Try again
          </button>

          <a
            href="/"
            className="rounded-full border border-stroke px-5 py-2.5 text-sm font-medium text-text-primary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Amanda Pricillia — Creative Portfolio",
      },
      {
        name: "description",
        content:
          "Portfolio of Amanda Pricillia, a designer and developer based in Tangerang, featuring UI/UX design, web development, graphic design, and academic publications.",
      },
      {
        name: "author",
        content: "Amanda Pricillia",
      },
      {
        property: "og:title",
        content: "Amanda Pricillia — Creative Portfolio",
      },
      {
        property: "og:description",
        content:
          "Explore selected UI/UX, web development, graphic design, and publication projects by Amanda Pricillia.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],

    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/aph-favicon.png?v=1",
      },
      {
        rel: "shortcut icon",
        type: "image/png",
        href: "/aph-favicon.png?v=1",
      },
      {
        rel: "apple-touch-icon",
        href: "/aph-favicon.png?v=1",
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@1&display=swap",
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>

      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}