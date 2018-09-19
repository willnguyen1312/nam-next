export const IS_DEV = process.env.NODE_ENV !== 'production'

export const SERVER_URL = IS_DEV
  ? 'https://jsonplaceholder.typicode.com/'
  : 'https://jsonplaceholder.typicode.com/'
