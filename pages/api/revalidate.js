export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // get body from request
    const body = req.body
    // get the slug from the body
    const slug = body.slug 
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate(`/housing/properties/${slug}`)
    await res.revalidate(`/articles/pha-housing-development-ltd-releases-2022-housing-market-study`)
    console.log(`Revalidated ${slug}`) 
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}