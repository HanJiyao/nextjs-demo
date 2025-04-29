import Image from "next/image";
export const SubscriptionIcon = ({ plan }: { plan: string }) => {
  if (plan === "free") return null;
  
  return (
    <Image
      src={`/icons/${plan?.toLowerCase() || 'free'}_plan.svg`}
      alt={`${plan || 'Free'} plan icon`}  
      width="96"
      height="96"
      className="object-contain"
    />
  );
};