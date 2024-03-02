export async function fetchConfig() {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    cache: "no-store",
  };

  try {
    const res = await fetch(`${process.env.CMS_URL}/api/cmsconfig?populate=*`, {
      ...options,
      cache: "no-store" as RequestCache,
    });
    const response = await res.json();
    return response;
  } catch (err) {}
}
