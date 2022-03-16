import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

const PageLayoutHome: FC = () => {
  return (
    <Link href="/">
      <a href="">
        <Image src="/vercel.svg" alt="Vercel Logo" width={120} height={64} />
      </a>
    </Link>
  );
};

export default PageLayoutHome;
