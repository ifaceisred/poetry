import { type MetadataRoute } from "next";
import { api } from "~/trpc/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await api.author.sitemap.query();

  return data.map((item) => ({
    url: `https://poetry.chujiaweicode.top/author/${item.id}`,
  }));
}
