import Image from "next/image";

export const Logo = ({ width = 25, height = 25 }) => {
  return <Image width={width} height={height} alt="logo" src="/logo.webp" />;
};
