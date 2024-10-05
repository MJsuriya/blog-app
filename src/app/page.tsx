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
      <div className="flex flex-col gap-8 items-center justify-center">
        <Head>
          <title>Blog App</title>
        </Head>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-8">
          {data.allArticles.map((p: any) => (
            <BlogPostPreview key={p.id} data={p} />
          ))}
        </div>
      </div>
  );
}

const BlogPostPreview = (props: any) => {
  const { data } = props;
  return (
    <div className="border-slate-300 border-2 p-4">
      <Image data={data.coverImage.responsiveImage} />
      <h2 className="text-2xl font-medium mt-4">
        <Link href={`/blog/${data.slug}`}>
          {data.title}
        </Link>
      </h2>
      <div className="text-sm">{data.publishedDate}</div>
      <p className="text-base text-justify mt-2">{data.excerpt}</p>
      <div className="font-semibold text-right"> - {data.author.name}</div>
    </div>
  );
};
