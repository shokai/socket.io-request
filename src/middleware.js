export const combineMiddlewares = (...middlewares) => (...args) => {
  middlewares = middlewares.concat(() => {})
  const next = () => middlewares.shift()(...args, next)
  return next()
}
