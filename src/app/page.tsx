/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { getAllPosts } from "./lib/posts";

export default function Home() {
  const posts = getAllPosts();
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
          {posts.map((p) => (
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
      <Image src={data.coverImage} alt={data.title} width={400} height={400}></Image>
      <h2>
        <Link href={`/blog/${data.slug}`}>
          {data.title}
        </Link>
      </h2>
      <div>{data.publishDate}</div>
      <p>{data.excerpt}</p>
      <div style={{ fontWeight: "bold" }}>{data.author.name}</div>
    </div>
  );
};
