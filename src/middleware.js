export const combineMiddlewares = (...middlewares) => (...args) => {
  const chain = middlewares.concat(() => {})
  const next = () => chain.shift()(...args, next)
  return next()
}
