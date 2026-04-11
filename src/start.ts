import { createMiddleware, createStart } from '@tanstack/react-start'

const logMiddleware = createMiddleware().server(async ({ next, request }) => {
  const result = await next()
  const response = result.response
  const contentType = response.headers.get('content-type') || ''

  if (response.ok && contentType.includes('application/json')) {
    const clonedResponse = response.clone() // body 只能读一次，clone 后再读日志
    try {
      const data = await clonedResponse.json()
      console.log('📤 ServerFn JSON Data:', {
        url: request.url,
        status: response.status,
        data,
      })
    } catch {
      console.log('📤 ServerFn TEXT Data', {
        url: request.url,
        status: response.status,
        text: await clonedResponse.text(),
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
