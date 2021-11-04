import { getAllBlogsData, getSidebarData } from '../lib/blogs';
import { NextSeo } from 'next-seo';

import Layout from '../components/Layout';
import BlogList from '../components/Blogs/BlogList';
import BlogSideBar from '../components/Blogs/BlogSideBar';
import BorderDashTitle from '../components/UI/BorderDashTitle';

const Home = ({ blogs, sidebar }) => {
  return (
    <>
      <NextSeo
        title='HOME'
        description='グラビアアイドルのマッサージ動画をレビューするサイト「アイドルレビューズ」です。新作のDMMアイドル動画のレビューを主に行っています。マッサージ以外のジャンルもたまにレビューします。'
      />
      <Layout>
        <div className='p-5 grid grid-cols-1 lg:grid-cols-12'>
          <div className='col-span-1 lg:col-span-9 py-5'>
            <BorderDashTitle classes='pl-5'>レビュー一覧</BorderDashTitle>
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
    props: { blogs, sidebar },
    revalidate: 60,
  };
};

export default Home;
