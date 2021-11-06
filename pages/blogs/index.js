import React, { useState, useEffect } from 'react';
import { getAllBlogsData, getSidebarData } from '../../lib/blogs';
import { useRouter } from 'next/router';
import { useBlogs } from '../../hooks/useBlog';
import { NextSeo } from 'next-seo';

import Layout from '../../components/Layout';
import BlogList from '../../components/Blogs/BlogList';
import BlogSideBar from '../../components/Blogs/BlogSideBar';
import BorderDashTitle from '../../components/UI/BorderDashTitle';
import DmmWidgeBanner from '../../components/Scripts/DmmWidgetBanner';
import Custom500 from '../500';

const Blogs = ({ staticBlogs, sidebar }) => {
  const router = useRouter();
  const [blogs, setBlogs] = useState(staticBlogs);
  const queryParams = !!router.query.tag ? `?tag=${router.query.tag}` : '';
  const { data, error } = useBlogs(queryParams);

  useEffect(() => {
    if (data) {
      setBlogs(data);
    }
  }, [data]);

  if (error) {
    return (
      <div>
        <Custom500 />
      </div>
    );
  }

  if (!blogs) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NextSeo
        title='レビュー一覧'
        description='グラビアアイドルのマッサージ動画をレビューするサイト「アイドルレビューズ」です。新作のDMMアイドル動画のレビューを主に行っています。マッサージ以外のジャンルもたまにレビューします。'
      />
      <Layout>
        <div className='px-5 grid grid-cols-1 lg:grid-cols-12'>
          <div className='col-span-1 lg:col-span-9 py-5'>
            <DmmWidgeBanner />
            <BorderDashTitle classes='pl-5'>{`レビュー一覧`}</BorderDashTitle>
            <BlogList blogs={blogs} />
          </div>
          <div className='col-span-1 lg:col-span-3 py-5'>
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

export const getStaticProps = async () => {
  const blogs = await getAllBlogsData();
  const sidebar = await getSidebarData();

  return {
    props: { staticBlogs: blogs, sidebar },
    revalidate: 60,
  };
};

export default Blogs;
