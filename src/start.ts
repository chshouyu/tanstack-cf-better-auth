import { createMiddleware, createStart } from '@tanstack/react-start'

const logMiddleware = createMiddleware().server(async ({ next, request }) => {
  const result = await next()
  const response = result.response
  const headers = response.headers
  const contentType = headers.get('content-type') || ''

  if (response.ok && contentType.includes('application/json')) {
    const clonedResponse = response.clone() // body 只能读一次，clone 后再读日志
    const headersObject = Object.fromEntries(headers.entries())
    const textData = await clonedResponse.text()

    try {
      const data = await clonedResponse.json()
      console.log('📤 ServerFn JSON Data:', {
        url: request.url,
        status: response.status,
        headers: headersObject,
        data,
        text: textData,
      })
    } catch {
      console.log('📤 ServerFn TEXT Data', {
        url: request.url,
        status: response.status,
        headers: headersObject,
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
