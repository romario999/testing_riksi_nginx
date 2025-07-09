import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Title } from './title';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';

interface Props {
  title: string;
  text: string;
  className?: string;
  imageUrl?: string;
}

export const InfoBlock: React.FC<Props> = ({ className, title, text, imageUrl }) => {
  return (
    <div className={cn(className, 'flex flex-wrap md:flex-nowrap items-center p-3 justify-center max-w-[840px] gap-6 md:gap-16')}>
      <div className="flex flex-col">
        <div className="max-w-[445px]">
          <Title size="lg" text={title} className="font-extrabold" />
          <p className="text-gray-400 text-lg mt-4">{text}</p>
        </div>

        <div className="flex gap-5 mt-8">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft />
              На головну
            </Button>
          </Link>
          <a href="#">
            <Button variant="outline" className="text-gray-500 border-gray-400 hover:bg-gray-50">
              Оновити
            </Button>
          </a>
        </div>
      </div>

      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-[300px] h-auto rounded-md" />
      )}
    </div>
  );
};
