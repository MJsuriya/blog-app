/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { performRequest } from "@/app/lib/datocms";
import { Image, StructuredText } from "react-datocms";

export default function BlogPostView(props: any) {
  const { postData } = props;
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-2xl w-full flex flex-col items-center gap-8 bg-white shadow-lg rounded-lg p-8">
      <Image data={postData.coverImage.responsiveImage} />
        <h1 className="text-3xl font-bold text-center">{postData.title}</h1>
        <p className="text-gray-600 text-center">
          {postData.author.name} / {postData.publishedDate}
        </p>
        {/* <p className="text-gray-800">{postData.content}</p> */}
        <StructuredText
          data={postData.content}
          renderBlock={({ record }) => {
            switch (record.__typename) {
              case "ImageblockRecord":                
                return <Image data={(record.blogDescriptionImage as any).responsiveImage} />;
              default:
                return null;
            }
          }}
        />
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

const PATHS_QUERY = `
query MyQuery {
  allArticles {
    slug
  }
}
`;

export const getStaticPaths = async() => {
  const slugQuery:any = await performRequest(PATHS_QUERY);

  const paths: any[] = [];
  slugQuery.allArticles.map((p: any) => paths.push(`/blog/${p.slug}`));

  return {
    paths,
    fallback: false,
  };
};

const ARTICLE_QUERY = `
query MyQuery($slug: String) {
  article(filter: {slug: {eq: $slug}}) {
    author {
      name
    }
    content {
      value
      blocks {
        __typename
        ... on ImageblockRecord {
          id
          blogDescriptionImage { 
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
        }
      }
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
    id
    publishedDate
    slug
    title
  }
}
`;
export const getStaticProps = async({ params }: any) => {
  // console.log('slug received is', params)

    // const data = await performRequest(ARTICLE_QUERY);
    const data = await performRequest(
      ARTICLE_QUERY,
      {
        variables: {slug: params.slug}
      }      
    );
    return {
      props: {
        postData: (data as { article: any }).article
      },
      revalidate: 120,
    };
 
};
