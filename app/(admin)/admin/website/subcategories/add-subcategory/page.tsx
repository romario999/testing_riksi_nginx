import { prisma } from "@/prisma/prisma-client";
import { AddSubcategory } from "@/shared/components/shared/admin/website-edit/subcategories/add-subcategory";

export const dynamic = 'force-dynamic';

export default async function AddSubcategoryPage() {

    const allCategories = await prisma.category.findMany();

    return (
        <div className="">
            <AddSubcategory allCategories={allCategories} />
        </div>
    );
}