import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { prisma } from '@/prisma/prisma-client';
import { ProductStickers } from '@prisma/client';
import ProductCarousel from './product-carousel';

export const MainTabs = async () => {
    const products = await prisma.product.findMany({
        include: {
            items: true,
        },
    });

    const hits = products.filter((product) => product.sticker.includes(ProductStickers.HITS));
    const newProducts = products.filter((product) => product.sticker.includes(ProductStickers.NEW));
    const priceParty = products.filter((product) => product.sticker.includes(ProductStickers.PRICEPARTY));

    const tabsData = [
        { key: 'hits', label: 'Хіти продажу', products: hits },
        { key: 'new', label: 'Новинки', products: newProducts },
        { key: 'priceparty', label: 'Price Party', products: priceParty },
    ];

    const firstAvailableTab = tabsData.find(tab => tab.products.length > 0)?.key || 'hits'; // fallback на hits

    return (
        <section className="mt-5 flex justify-center">
            <Tabs defaultValue={firstAvailableTab} className="w-full">
                <TabsList className="flex justify-center gap-5">
                    {tabsData.map(tab => (
                        tab.products.length > 0 && (
                            <TabsTrigger
                                key={tab.key}
                                value={tab.key}
                                className="text-base sm:text-lg md:text-xl py-1 px-3 data-[state=active]:bg-gray-300 data-[state=active]:rounded-sm data-[state=active]:text-black"
                            >
                                {tab.label}
                            </TabsTrigger>
                        )
                    ))}
                </TabsList>

                {hits.length > 0 && (
                    <TabsContent value="hits" className='mt-1 sm:mt-6'>
                        <ProductCarousel stickerType="HITS" products={hits} />
                    </TabsContent>
                )}
                {newProducts.length > 0 && (
                    <TabsContent value="new" className='mt-1 sm:mt-6'>
                        <ProductCarousel stickerType="NEW" products={newProducts} />
                    </TabsContent>
                )}
                {priceParty.length > 0 && (
                    <TabsContent value="priceparty" className='mt-1 sm:mt-6'>
                        <ProductCarousel stickerType="PRICEPARTY" products={priceParty} />
                    </TabsContent>
                )}
            </Tabs>
        </section>
    );
};
