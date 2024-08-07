import PagePadding from '@/components/PagePadding';
import UserIcon from '@/components/UserIcon';
import Image from 'next/image';
import { FaChromecast } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

const Header = ({ children }) => {
  return (
    <header className="relative overflow-y-auto w-full h-full">
      <section className="absolute top-0 w-full">
        <div className="relative h-[400px] w-full">
          <Image alt="mediaItem" className="object-cover" fill src="https://images.unsplash.com/photo-1707833558984-3293e794031c" />
          <div className="absolute h-[400px] top-0 bg-black opacity-40 w-full "></div>
          <div className="absolute h-[400px] top-0 bg-gradient-to-t from-black w-full "></div>
        </div>
      </section>
      <section className="sticky">
        <PagePadding>
          <div className="h-[64px]] flex flex-row justify-between items-center">
            <article className="h-[42px] min-w-[480px] flex flex-row items-center bg-[rgba(0,0,0,0.14)] rounded-2xl px-[16px] gap-[16px]">
              <div>
                <FiSearch size={ 24 } />
              </div>
              <input className="h-full w-full bg-transparent" placeholder="노래, 앨범, 아티스트, 팟캐스트 검색" type="text" />
            </article>
            <article className="flex flex-row gap-6 items-center">
              <FaChromecast size={ 26 } />
              <UserIcon  />
            </article>
          </div>
        </PagePadding>
      </section>
      <section className="relative">
        { children }
      </section>
    </header>
  );
}

export default Header;
