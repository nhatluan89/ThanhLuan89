export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const { name, phone, email, message, source } = request.body ?? {}
  if (![name, phone, email, message].every(value => typeof value === 'string' && value.trim())) {
    return response.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' })
  }

  // The deployment integration can consume this payload from the existing leads pipeline.
  return response.status(201).json({ ok: true, lead: { name, phone, email, message, source } })
}
