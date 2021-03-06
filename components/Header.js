import NavLinkList from './Navigations/Shared/NavLinkList';
import { MenuIcon } from '@heroicons/react/outline';
import Link from 'next/link';

const Header = ({ isPhone, onChangeMenu }) => {
  return (
    <header className='bg-white flex items-center justify-center border-b h-14 w-full'>
      <div className='flex flex-grow items-center justify-between p-3'>
        <span className='text-xl font-bold tracking-wide'>
          <Link href='/'>
            <a>アイドルレビューズ</a>
          </Link>
        </span>

        {isPhone ? (
          <button
            className='p-3 rounded ml-auto outline-none'
            onClick={onChangeMenu}
          >
            <MenuIcon className='h-6 w-6' />
          </button>
        ) : (
          <NavLinkList />
        )}
      </div>
    </header>
  );
};

export default Header;
