import { prisma } from "@/prisma/prisma-client";
import { WebsiteEdit } from "@/shared/components/shared/admin/website-edit/website-edit";

export const dynamic = 'force-dynamic';

export default async function AdminWebsiteCarouselEditPage() {
    const carousels = await prisma.sliderImage.findMany();
    return (
        <div>
            <WebsiteEdit values={carousels} props={'carousel'} />
        </div>
    );
}