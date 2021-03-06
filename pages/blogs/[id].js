import { getAllBlogIds, getBlogData } from '../../lib/blogs';
import { getSidebarData } from '../../lib/sidebar';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

import Layout from '../../components/Layout';
import BlogDetail from '../../components/Blogs/BlogDetail';
import Card from '../../components/UI/Card';
import IdolDetail from '../../components/Idols/IdolDetail';
import BlogSideBar from '../../components/Blogs/BlogSideBar';

const Blog = ({ blog, sidebar }) => {
  return (
    <>
      <NextSeo
        title={`${blog.idol.name}「${blog.pieceTitle}」画像レビュー`}
        description={blog.shotOutline}
        openGraph={{
          title: `${blog.idol.name}「${blog.pieceTitle}」画像レビュー - アイドルレビューズ`,
          description: blog.shotOutline,
          url: `https://idol-review.com/blogs/${blog.id}`,
          site_name: 'アイドルレビューズ',
          images: [{ url: blog.pieceImage }],
        }}
      />
      <Head>
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:domain' content='idol-review.com' />
        <meta
          name='twitter:title'
          content={`${blog.idol.name}「${blog.pieceTitle}」画像レビュー - アイドルレビューズ`}
        />
        <meta name='twitter:description' content={blog.shotOutline} />
        <meta name='twitter:image' content={blog.pieceImage} />
      </Head>
      <Layout
        idols={sidebar.idols}
        genreList={sidebar.genreList}
        saleList={sidebar.saleList}
      >
        <div className='p-5 grid grid-cols-1 md:grid-cols-9 lg:grid-cols-12 gap-2'>
          <div className='hidden lg:col-span-3 lg:inline-block p-5'>
            <IdolDetail idol={blog.idol} />
          </div>
          <Card classes='grid-cols-1 md:col-span-6 bg-white p-5'>
            <BlogDetail blog={blog} />
          </Card>
          <div className='grid-cols-1 md:col-span-3 sm:py-5'>
            <BlogSideBar
              idols={sidebar.idols}
              genreList={sidebar.genreList}
              saleList={sidebar.saleList}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  const paths = await getAllBlogIds();

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  const blog = await getBlogData(params.id);
  const sidebar = await getSidebarData();

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: { blog, sidebar },
    revalidate: 60,
  };
};

export default Blog;
