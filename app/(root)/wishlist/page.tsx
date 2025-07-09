import { prisma } from '@/prisma/prisma-client';
import { Container } from '@/shared/components/shared/container';
import { WishlistList } from '@/shared/components/shared/wishlist-list';
import { generateOptimizedMetadata } from '@/shared/lib';
import { getUserSession } from '@/shared/lib/get-user-session';
import { redirect } from 'next/navigation';

export async function generateMetadata() {
  return generateOptimizedMetadata({ wishlist: true });
}

export default async function WishlistPage() {
  const session = await getUserSession();
  
  if(!session) {
    return redirect('/not-auth');
  }
  
  const user = await prisma.user.findFirst({
    where: {
      id: Number(session?.id)
    }
  });

  if(!user) {
    return redirect('/not-auth');
  }
  return (
    <Container className='my-10'>
      <WishlistList />
    </Container>
  );
}
