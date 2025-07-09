import { prisma } from "@/prisma/prisma-client";
import { WebsiteEdit } from "@/shared/components/shared/admin/website-edit/website-edit";

export const dynamic = 'force-dynamic';

export default async function AdminWebsiteBannersEditPage() {
    const banners = await prisma.bannerImage.findMany();

    return (
        <div>
            <WebsiteEdit values={banners} props={'banners'} />
        </div>
    );
}