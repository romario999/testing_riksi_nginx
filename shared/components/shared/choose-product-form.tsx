'use client';

import { cn } from '@/shared/lib/utils';
import React, { useState } from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Ban, Heart, ShoppingCart, Slash } from 'lucide-react';
import { ProductComplect, ProductItem } from '@prisma/client';
import { TabsProduct } from './tabs-product';
import CarouselProductImg from './carousel-product-img';
import { ComplectProductForm } from './complect-product-form';
import Link from 'next/link';
import { Category } from './product-form';
import { Tooltip } from 'react-tooltip';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useFavorites } from '@/shared/hooks';

interface Props {
    id: number;
    imageUrl: string[];
    name: string;
    price: number;
    discountPrice?: number | null;
    stickers?: string[];
    loading?: boolean;
    className?: string;
    onSubmit?: (id: number | undefined) => void;
    onSubmitFavorite?: (isFavorite: boolean) => void;
    description?: string | null;
    items: ProductItem[];
    complects?: ProductComplect[] | any;
    category?: Category | null;
}

type BreadcrumbsProps = {
    categoryUrl?: string | null;
    categoryName?: string | null;
    productName: string;
}
const SizesTableModal = dynamic(() => import('./modals/sizes-table-modal'));

const Breadcrumbs = ({ categoryUrl, categoryName, productName }: BreadcrumbsProps) => {
    return (
        <div className="flex items-center text-xs md:text-sm lg:text-sm mb-3 text-gray-400">
            <Link href="/" className="hover:underline text-center">Головна</Link>
            <Slash size={14} className="mx-1 ml:mx-2" />
            <Link href="/catalog" className="hover:underline text-center">Каталог</Link>
            <Slash size={14} className="mx-1 ml:mx-2" />
            {categoryUrl && categoryName ? (
                <>
                    <Link href={`/catalog/${categoryUrl}`} className="hover:underline text-center">{categoryName}</Link>
                    <Slash size={14} className="mx-1 ml:mx-2" />
                </>
            ) : null}
            <span className='text-center'>{productName}</span>
        </div>
    );
};


export const ChooseProductForm: React.FC<Props> = ({
    id,
    name,
    imageUrl,
    price,
    onSubmit,
    onSubmitFavorite,
    className,
    loading,
    description,
    items,
    discountPrice,
    stickers,
    complects,
    category,
}) => {
    const [openSizeModal, setOpenSizeModal] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<number>(price);
    const hasInStock = selectedSize
        ? !!items.find((item) => item.size === selectedSize)?.stock
        : items.some((item) => item.stock);
    const sku = items.find((item) => item.size === selectedSize)?.sku;
    const handleSizeClick = (size: string) => {
        const selectedItem = items.find((item) => item.size === size);
        if (selectedItem) {
            setSelectedSize(size);
            setSelectedPrice(selectedItem.price); // Оновлюємо ціну вибраного розміру
        }
    };
    
    const { favoriteItems, toggleLoading, favoriteLoading } = useFavorites();
    const isFavorite = favoriteItems.some((item: { id: number }) => item.id === id);
    const session = useSession().data?.user;

    return (
        <div className={cn(className, 'flex flex-col ml:flex-row gap-4 md:gap-8 mb-[10px] md:mb-[130px]')}>
            <div className="block ml:hidden mx-auto">
                <Breadcrumbs
                    categoryUrl={category?.categoryUrl}
                    categoryName={category?.name}
                    productName={name}
                />
            </div>
            <div className="flex flex-col items-center justify-start mx-auto sm:w-[700px] w-full max-w-screen-md px-0 pt-4 overflow-hidden">
            <div className="w-full max-w-[370px]">
            <CarouselProductImg
                productName={name}
                items={imageUrl}
                stickers={stickers}
            />
            </div>
</div>

            <div className="flex flex-col w-full px-0 py-4">
                <div className='hidden ml:block'>
                    <Breadcrumbs
                        categoryUrl={category?.categoryUrl}
                        categoryName={category?.name}
                        productName={name}
                    />
                </div>
                <div className="flex justify-between">
                    <Title text={name} className="text-xl sm:text-3xl font-extrabold mb-1" />
                    {selectedSize && (
                        <div className="hidden sm:block h-[50px] bg-neutral-200 rounded-sm">
                            <b className="text-sm  p-3">Артикул:</b>
                            <p className="text-[10px] lg:text-sm px-3">{sku}</p>
                        </div>
                    )}
                </div>
                {selectedSize && (
                        <div className="block sm:hidden my-3">
                            <p className="text-sm"><span className='font-bold'>Артикул:</span> {sku}</p>
                        </div>
                )}
                {hasInStock ? (
                    <p className="text-green-600 text-sm">В наявності</p>
                ) : (
                    <p className="text-red-600 text-sm">Немає в наявності</p>
                )}
                <b className="mt-3 text-3xl mb-5">
                    {discountPrice ? (
                        <>
                            <span>{selectedPrice}₴</span>
                            <span className="ml-3 text-gray-400 line-through text-[21px]">{discountPrice}₴</span>
                        </>
                    ) : (
                        <span>{selectedPrice}₴</span>
                    )}
                </b>
                <div
                    onClick={() => {
                        if (!session) return;
                        onSubmitFavorite?.(isFavorite);
                    }}
                    className={`add-like flex max-w-[250px] gap-3 mb-5 ${
                        toggleLoading || favoriteLoading
                        ? 'pointer-events-none text-gray-400'
                        : session
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed'
                    }`}
                    >
                    <Heart color={favoriteLoading || toggleLoading ? 'gray' : isFavorite ? 'red' : 'black'} />
                    <span className='font-thin'>
                        {isFavorite ? 'В обраному' : 'Додати до cписку обраного'}
                    </span>
                    {!session && (
                        <Tooltip
                        content="Увійдіть, щоб додати до списку обраного"
                        anchorSelect='.add-like'
                        place="top"
                        />
                    )}
                </div>

                <hr />
                <div className="mt-5">
                    <p className="text-lg font-bold">Розміри</p>
                    <div className="flex gap-3 items-center flex-wrap">
                        {items.sort((a, b) => Number(a.id) - Number(b.id)).map((item) => (
                            <Button
                                key={item.size}
                                onClick={() => handleSizeClick(item.size)}
                                variant={selectedSize === item.size ? 'default' : 'outline'}
                                className={`h-[40px] px-5 text-base  ${category } mt-4 ${category?.categoryUrl === "sertyfikaty" ? 'w-auto' : 'w-[40px]'} ${selectedSize === item.size && 'text-white'}`}
                            >
                                {item.size}
                            </Button>
                        ))}
                        <Button onClick={() => setOpenSizeModal(true)} variant="link" className="mt-4">
                            Розмірна таблиця
                        </Button>
                    </div>
                </div>
                {hasInStock ? (
                    <>
                        <div className={`relative h-[55px] w-[300px] mb-8 mt-8 ${!selectedSize ? 'tooltip-wrapper' : ''}`} data-tooltip-id="add-to-cart-tooltip" data-tooltip-content="Оберіть розмір">
                            <Button
                                loading={loading}
                                onClick={() => onSubmit?.(items.find((item) => item.size === selectedSize)?.id)}
                                className="h-full px-10 text-base rounded-[18px] w-full"
                                disabled={!selectedSize}
                            >
                                <ShoppingCart size={22} className="mr-3" /> Додати в кошик
                            </Button>
                        </div>
                        {!selectedSize && <Tooltip id="add-to-cart-tooltip" />}
                    </>
                ) : (
                    <Button loading={loading} variant="outline" className="h-[55px] px-8 text-base rounded-[18px] w-[300px] mb-8 mt-10">
                       <Ban className='mr-2' size={22} /> Немає в наявності
                    </Button>
                )}
                <hr />
               <div className="mt-5 mb-5">
                    <p className="text-lg font-bold">Опис</p>
                    <div 
                        className="mt-2 text-justify"
                        dangerouslySetInnerHTML={{ __html: description ?? '' }} 
                    />
                </div>

                <hr />
                {complects && complects.length > 0 && <ComplectProductForm currentId={id} complects={complects[0].products} />}
                <hr />
                <TabsProduct />
            </div>
            {openSizeModal && <SizesTableModal open={openSizeModal} onClose={() => setOpenSizeModal(false)} />}
        </div>
    );
};