import { prisma } from '@/prisma/prisma-client';
import { Container } from '@/shared/components';
import { generateOptimizedMetadata } from '@/shared/lib';
import { Slash } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

export async function generateMetadata({ params }: { params: { footerUrl: string } }) {
  return generateOptimizedMetadata({ footerUrl: params.footerUrl });
}

export const dynamic = 'force-dynamic';

export default async function FooterPage({ params: { footerUrl } }: { params: { footerUrl: string } }) {
  
  const pages = await prisma.footerPage.findMany({
        where: { isActive: true },
      });
  const pageInfo = await prisma.footerPage.findUnique({
        where: { footerUrl: footerUrl },
      });

  if (!pageInfo) {
    notFound();
  }

  return (
    <section>
  <Container className='p-2'>
    <div className="flex flex-col sm:flex-row flex-wrap gap-6 pb-20 py-3 sm:py-20">
    <div className="sm:hidden flex items-center text-sm ml-2 text-gray-400">
      <Link href="/">Головна</Link>
      <Slash size={14} className="mx-2" />
      <span>{pageInfo?.title}</span>
    </div>
      <div className="hidden sm:block w-full sm:w-[210px]">
        <ul className="flex flex-col gap-5">
          {pages
            .sort((a, b) => a.id - b.id)
            .map((item, i) => (
              <li
                key={i}
                className={`rounded p-1 ${
                  footerUrl === item.footerUrl ? 'bg-[#e7e7e7] font-bold' : ''
                }`}
              >
                <Link href={`${item.footerUrl}`}>{item.title}</Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex-1">
        <div className="sm:flex hidden items-center text-sm ml-2 mb-5 text-gray-400">
          <Link href="/">Головна</Link>
          <Slash size={14} className="mx-2" />
          <span>{pageInfo?.title}</span>
        </div>
        <h4 className="text-2xl font-bold">{pageInfo.secondTitle}</h4>
        <div
          className="mt-5 ql-editor [&>ul]:pl-6 [&>ul]:list-disc [&>ol]:pl-6 [&>ol]:list-decimal [&>li]:mb-2"
          dangerouslySetInnerHTML={{ __html: pageInfo.content || '' }}
        />
      </div>
    </div>
  </Container>
  </section>

  );
}
