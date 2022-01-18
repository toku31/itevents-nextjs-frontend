import cookie from 'cookie' //37 Store JWT in Server HttpOnly Cookie
import { API_URL } from "@/config/index"; // 36 Login & JWT

export default async (req, res) => {
  if (req.method === 'POST') {
    const { identifier, password } = req.body
    
    // console.log(req.body)
    const strapiRes = await fetch(`${API_URL}/auth/local`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier,
          password
        })
      })
    
    const data = await strapiRes.json()

    console.log(data.jwt)  // Token

    if (strapiRes.ok) {
      // Set cookie
      res.setHeader('Set-Cookie', cookie.serialize
        ('token', data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/'
      }))

      res.status(200).json({user: data.user})
    } else {
      res.status(data.statusCode).json({message: data.message[0].messages[0].message})
    }

  } else {
    res.setHeader('Allow', ['POST'])
      res.status(405).json({ message: `Method ${req.method} not allowed`})
  }
}