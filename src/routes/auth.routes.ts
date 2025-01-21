import express from 'express'
import passport from '../auth/passport'
import prisma from '../lib/prisma'

const authRouter = express.Router()

authRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

authRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    const email = (await req?.user) ? req?.user?.email : undefined
    if (!email) {
      return res.redirect('/login')
    }
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })
    if (user.id) {
      const credentials = {
        userId: user.id,
      }
      res.cookie('credentials', credentials, { httpOnly: true })
      res.writeHead(302, {
        location: process.env.FRONTEND_REDIRECT_URL as string,
      })
      res.end()
    } else {
      res.redirect(process.env.FRONTEND_PROFILE_REDIRECT_URL as string)
      res.end()
    }
    return null
  }
)

export default authRouter
