export async function fetchConfig() {
  const headers = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  try {
    const res = await fetch(`${process.env.CMS_URL}/api/cmsconfig?populate=*`, {
      ...headers,
      next: { tags: ["collection"] },
      cache: 'force-cache',
    });
    const response = await res.json();
    return response;
  } catch (err) {}
}
