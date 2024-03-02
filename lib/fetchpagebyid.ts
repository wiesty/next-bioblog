export async function fetchPage(id: number) {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    cache: "no-store",
  };

  try {
    const res = await fetch(
      `${process.env.CMS_URL}/api/pages/${id}?populate=*`,
      {
        ...options,
        cache: "no-store",
      }
    );
    const response = await res.json();
    return response;
  } catch (err) {}
}
