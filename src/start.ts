import { createMiddleware, createStart } from '@tanstack/react-start'

const logMiddleware = createMiddleware().server(async ({ next, request }) => {
  const result = await next()
  const response = result.response
  const headers = response.headers
  const contentType = headers.get('content-type') || ''

  if (response.ok && contentType.includes('application/json')) {
    const textResponse = response.clone()
    const jsonResponse = response.clone()
    const headersObject = Object.fromEntries(headers.entries())
    const textData = await textResponse.text()

    try {
      const data = await jsonResponse.json()
      console.log('📤 ServerFn JSON Data:', {
        url: request.url,
        status: response.status,
        headers: headersObject,
        data,
        text: textData,
      })
    } catch (error) {
      console.log('📤 ServerFn TEXT Data', {
        url: request.url,
        status: response.status,
        headers: headersObject,
        error,
        text: textData,
      })
    }
  }

  return result
})

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [logMiddleware],
  }
})
