import Image from "next/image";
const FishIcon = ({ className = "" }) => {
  return (
    <span className={className} style={{ display: "inline-flex" }}>
      <Image
        src="/icons/fishies.svg"
        width="24"
        height="24"
        alt="fish"
        crossOrigin="anonymous"
      />
    </span>
  );
};

export default FishIcon;
