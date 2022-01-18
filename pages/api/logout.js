import cookie from 'cookie' //37 Store JWT in Server HttpOnly Cookie
// import { API_URL } from "@/config/index"; // 36 Login & JWT

//39 Logout
export default async (req, res) => {
  if (req.method === 'POST') {
    // Destroy cookie
    res.setHeader('Set-Cookie', cookie.serialize
      ('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/'
      })
    )

    res.status(200).json({message: 'Logout Success'})
  } else {
    res.setHeader('Allow', ['POST'])
      res.status(405).json({ message: `Method ${req.method} not allowed`})
  }
}