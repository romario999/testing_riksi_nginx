export const ApiRoutes = {
    SEARCH_PRODUCTS: `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/search`,
    CATEGORIES: `${process.env.NEXT_PUBLIC_SITE_URL}/api/categories`,
    SUBCATEGORIES: `${process.env.NEXT_PUBLIC_SITE_URL}/api/subcategories`,
    CAROUSEL: `${process.env.NEXT_PUBLIC_SITE_URL}/api/getSliderItems`,
    BANNER: `${process.env.NEXT_PUBLIC_SITE_URL}/api/getBannerItems`,
    FOOTERPAGE: `${process.env.NEXT_PUBLIC_SITE_URL}/api/getFooterPages`,
    ORDERS: `${process.env.NEXT_PUBLIC_SITE_URL}/api/orders`
} as const;