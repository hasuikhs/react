"use client";

import IconButton from '@/components/elements/IconButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RxHamburgerMenu } from 'react-icons/rx';

const Logo = () => {
  const { push } = useRouter();
  const onClickLogo = () => {
    push("/");
  }
  const onClickMenu = () => {};

  return (
    <section className="flex flex-row items-center gap-3">
      <IconButton
        icon={ <RxHamburgerMenu size={ 24 } /> }
      />
      <div className="cursor-pointer" onClick={ onClickLogo }>
        <Image
          alt="logo"
          width={ 100 }
          height={ 300 }
          src={"/main-logo.svg"}
        />
      </div>
    </section>
  );
}

export default Logo
