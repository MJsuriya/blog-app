export interface BlogPost {
  data: {
    id: string;
    coverImage: {
      responsiveImage: any; // You might want to replace this with a more specific type from your image library
    };
    title: string;
    slug: string;
    publishDate: string;
    excerpt: string;
    author: {
      name: string;
    };
  };
}
