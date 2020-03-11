import { Errback, Request, Response, NextFunction } from 'express'

export default function(
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(400).json({ handleError: true, ...err })
}
