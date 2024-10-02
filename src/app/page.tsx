/* eslint-disable @typescript-eslint/no-explicit-any */

import { Image } from "react-datocms";
import Head from "next/head";
import Link from "next/link";
import { performRequest } from "./lib/datocms";

const HOMEPAGE_QUERY = `
query MyQuery {
  allArticles {
    title
    author {
      name
    }
    content {
      value
    }
    coverImage {
      responsiveImage {
        width
        webpSrcSet
        title
        srcSet
        src
        sizes
        height
        bgColor
        base64
        aspectRatio
        alt
      }
    }
    excerpt
    id
    publishedDate
    slug
  }
}
`;

export default async function Home() {
  const data: any = await performRequest(HOMEPAGE_QUERY);
  // console.log(data.allArticles.length)
  // const posts = getAllPosts();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Head>
          <title>Cooking with Tuomo</title>
        </Head>
        <div>
          <h1>Cooking w/ Tuomo</h1>
        </div>
        <div>
          {data.allArticles.map((p: any) => (
            <BlogPostPreview key={p.id} data={p} />
          ))}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}

const BlogPostPreview = (props: any) => {
  const { data } = props;
  return (
    <div>
      <Image data={data.coverImage.responsiveImage} />
      <h2>
        <Link href={`/blog/${data.slug}`}>
          {data.title}
        </Link>
      </h2>
      <div>{data.publishedDate}</div>
      <p>{data.excerpt}</p>
      <div style={{ fontWeight: "bold" }}>{data.author.name}</div>
    </div>
  );
};
