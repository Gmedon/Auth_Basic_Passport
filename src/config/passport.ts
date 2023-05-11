import passport from "passport";
import { BasicStrategy } from "passport-http";
import { Request, Response, NextFunction } from "express";

import {User} from '../models/User'

const notAuthorizedeJson = {Status: 401, message: 'Não autorizado'}

passport.use(new BasicStrategy(async (email, password, done) => {
    if(email && password) {
       const user = await User.findOne({
        where: {email, password}
       });
       if(user) {
        return done(null, user);
       }
    }else {
        return done(notAuthorizedeJson, false)
    }
}))

export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
    let authFunction = passport.authenticate('basic', (err: string, user: string) => {
        return user ? next() : next(notAuthorizedeJson);
        res.json(notAuthorizedeJson)
    });
    authFunction(req, res, next);
}

export default passport;