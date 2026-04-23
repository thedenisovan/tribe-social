import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

function validResult(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  } else {
    return res.send({ errors: result.array(), isUserCreated: false });
  }
}

export default validResult;
