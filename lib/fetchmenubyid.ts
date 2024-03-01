export async function fetchMenu(id: string) {
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
          next: { tags: ["collection"] },
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
}
