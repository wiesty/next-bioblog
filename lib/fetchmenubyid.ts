import { cache } from 'react'

export const revalidate = 3600

export const fetchMenu = cache(async (id: number) => {
  const headers = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  try {
    const [menuRes] = await Promise.all([
      fetch(
        `${process.env.CMS_URL}/api/menus/${id}?populate=*`,
        {
          ...headers,
          cache: 'force-cache',
        }
      ),
    ]);

    const [menuData] = await Promise.all([menuRes.json()]);

    return {
      menuData,
    };
  } catch (err) {
    console.error("Error fetching menu and config:", err);
    return {
      menuData: null,
    };
  }
})
