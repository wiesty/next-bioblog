export async function fetchPage(id: number) {
  const headers = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  try {
    const res = await fetch(
      `${process.env.CMS_URL}/api/pages/${id}?populate=*`,
      {
        ...headers,
        next: { tags: ["collection"] },
        cache: 'force-cache',
      }
    );
    const response = await res.json();
    return response;
  } catch (err) {}
}
