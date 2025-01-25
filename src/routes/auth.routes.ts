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
      res.redirect(process.env.FRONTEND_REDIRECT_URL as string)
      res.end()
    }
    return null
  }
)

authRouter.get('/logout', (req, res) => {
  res.clearCookie('credentials')
  res.clearCookie('connect.sid')
  req.session?.destroy(err => {
    if (err) {
      throw new Error(err)
    }
    res.redirect(process.env.FRONTEND_REDIRECT_URL as string)
  })
})

export default authRouter
