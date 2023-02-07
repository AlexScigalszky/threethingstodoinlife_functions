// const Cors = (options: string): MethodDecorator  => {
//   console.log(`alex${options}`)
//   // eslint-disable-next-line func-names
//   return function (this: (...args: any) => any): any {
//     // const argsString: string = JSON.stringify(args)
//     // if (container === null) {
//     //   container = getCacheContainer(target.constructor as any)
//     //   if (container) {
//     //     provider.addToContainer(container, cacheObject)
//     //   }
//     // }

import { HandlerEvent } from '@netlify/functions'

//     // if (!cacheObject.hasCache(argsString) || cacheObject.isExpired(argsString)) {
//     //   const res = method.call(this, ...args)

//     //   provider.setCache(options, argsString, res)

//     //   const isPromise = res && typeof res.then === 'function' && typeof res.catch === 'function'

//     //   if (isPromise && options.cacheUntilRejected) {
//     //     res.catch(() => cacheObject.clearArgs(argsString))
//     //   }
//     // }
//   }
// }
const logged = (_target: unknown, propertyKey: unknown, descriptor?: PropertyDescriptor) => {
  console.log(`La función ${propertyKey} ha sido llamada`)
  return descriptor
}

const CorsBase = (_target: unknown, _propertyKey: string, descriptor: PropertyDescriptor) => {
  const original = descriptor.value
  // eslint-disable-next-line no-param-reassign
  descriptor.value = (event: HandlerEvent, ...args: unknown[]) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
    }
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Successful preflight call.' }),
      }
    }
    // eslint-disable-next-line no-invalid-this
    return original.apply(this, args)
  }
  return descriptor
}

const Cors = (target: { name: string }) => CorsBase(target, target.name, target as unknown as PropertyDescriptor)

export { logged, CorsBase, Cors }
