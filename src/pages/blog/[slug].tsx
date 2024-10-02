/* eslint-disable @typescript-eslint/no-explicit-any */

import { getAllSlugs, getPostData } from "../../app/lib/posts";
import Link from "next/link";
import Image from "next/image";

export default function BlogPostView(props: any) {
  const { postData } = props;
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-2xl w-full flex flex-col items-center gap-8 bg-white shadow-lg rounded-lg p-8">
        <Image
          src={postData.coverImage}
          alt={postData.title}
          width={500}
          height={500}
          
        />

        <h1 className="text-3xl font-bold text-center">{postData.title}</h1>
        <p className="text-gray-600 text-center">
          {postData.author} / {postData.publishDate}
        </p>
        <p className="text-gray-800">{postData.content}</p>
        <div className="mt-12 w-full">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ⬅️&nbsp;&nbsp;Back to the frontpage
          </Link>
        </div>
      </main>
    </div>
  );
}

export const getStaticPaths = () => {
  const paths = getAllSlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = ({ params }: any) => {
  console.log("here priting slug", params);
  const postData = getPostData(params.slug);

  return {
    props: {
      postData,
    },
  };
};
