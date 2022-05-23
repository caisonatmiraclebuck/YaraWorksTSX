import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: {},
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { uid } = req.query

    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET')
        return res.status(405).end()
    }

    const users =  await fetch(`https://reqres.in/api/users/${uid}`)

    if(!users.ok){
        res.status(500).json({ data: [{ message: `Unable to fetch API`,}]})
    }

    const { data } = await users.json()
    res.status(200).json({ data: data })
}
