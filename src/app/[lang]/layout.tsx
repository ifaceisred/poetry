import { ScrollArea } from "~/components/ui/scroll-area";
import { DesktopMenu, MobileMenu } from "./components/menu";
import dynamic from "next/dynamic";
import {
  type Locale,
  getDictionary,
  getMetaDataAlternates,
} from "~/dictionaries";
import { type Metadata } from "next/types";
import { MyHost } from "~/utils";
import { Language } from "~/components/language";
import { Logo } from "~/components/logo";

const Search = dynamic(() => import("./components/search"), { ssr: false });
const ModeToggle = dynamic(() => import("~/components/mode-toggle"), {
  ssr: false,
});

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);

  return {
    title: {
      template: `%s | ${dict.title}`,
      default: `${dict.title}`,
    },
    description: dict.description,
    icons: [{ rel: "icon", url: "/site-logo.png" }],
    alternates: getMetaDataAlternates("/", params.lang),
    metadataBase: new URL(MyHost),
    twitter: {
      site: `${MyHost}/${params.lang}`,
      creator: "@meetqy",
      images: `/${params.lang}/twitter-image`,
    },
    openGraph: {
      url: `${MyHost}/${params.lang}`,
      type: "article",
      images: {
        url: `/${params.lang}/twitter-image`,
        width: 1200,
        height: 630,
      },
    },
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);

  return (
    <>
      <div className="relative z-10 flex bg-background/20 p-0">
        <aside className="hidden lg:block">
          <div className="fixed left-0 top-0 h-screen bg-muted/50">
            <ScrollArea className="sticky top-0 h-full w-72 border-border">
              <header className="h-16 flex items-center justify-center text-2xl">
                <div>{dict.title}</div>
                {/* <Logo lang={params.lang} /> */}
              </header>

              <div>
                <DesktopMenu dict={dict} lang={params.lang} />
              </div>
            </ScrollArea>
          </div>
          <div className="w-72"></div>
        </aside>

        <MobileMenu dict={dict} lang={params.lang} />

        <div className="flex-1 bg-gradient-to-t from-background to-muted/10">
          <header
            className="sticky top-0 z-40 flex min-h-16 w-full flex-row-reverse items-center justify-between border-b border-border/50 bg-background/70 pl-14 pr-4 backdrop-blur lg:pl-0"
            id="header_main"
          >
            <div className="flex items-center justify-center">
              <div className="mr-2">
                <Search dict={dict} lang={params.lang} />
              </div>
              <ModeToggle />
            </div>
          </header>
          <main className="relative m-auto max-w-screen-md">{children}</main>
        </div>
      </div>

      <Language />
    </>
  );
}
