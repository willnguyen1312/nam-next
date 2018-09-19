import { Request } from 'express'
interface CustomRequestType extends Request {
  locale: string
  localeDataScript: any
  messages: any
}
