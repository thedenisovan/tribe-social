import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import prismaNeon from '../db/prisma.js';
import bcrypt from 'bcryptjs';

passport.use(new LocalStrategy({ usernameField: 'email' }, verifyCallback));

// Callback for passport strategy
async function verifyCallback(
  email: string,
  password: string,
  done: (err: Error | null | unknown, user?: any, info?: any) => void,
) {
  try {
    const user = await prismaNeon.user.findUnique({ where: { email } });

    if (!user) {
      return done(null, false);
    }

    // Validate password
    const isPassValid = await bcrypt.compare(password, user.hashedPassword);

    if (isPassValid) {
      return done(null, user.id);
    } else {
      return done(null, false);
    }
  } catch (e) {
    done(e);
  }
}
