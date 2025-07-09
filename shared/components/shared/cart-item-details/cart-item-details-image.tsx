import { cn } from "@/shared/lib/utils";

interface Props {
  src: string;
  className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
  return <img className={cn('w-[60px] h-[90px] rounded-sm', className)} src={src} />;
};
