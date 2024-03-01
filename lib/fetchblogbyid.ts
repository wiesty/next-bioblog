export async function fetchBlog(id: number) {
  const headers = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  try {
    const res = await fetch(
      `${process.env.CMS_URL}/api/blogs/${id}?populate=*`,
      {
        ...headers,
        next: { tags: ["collection"] },
      }
    );
    const response = await res.json();
    return response;
  } catch (err) {}
}
