import type { NextApiRequest, NextApiResponse } from 'next'
// Defining the values that <Data> can accept
type Data = {
  data: {},
}

export default async function handler(
  req: NextApiRequest, //Request coming to the function
  res: NextApiResponse<Data> //Response returned from the function with type Data
) {
    //Getting the uid passed in API Endpoint
    const { uid } = req.query

    //Returning back with 405 if request method is not correct
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET')
        return res.status(405).end()
    }

    //Calling the API
    const users =  await fetch(`https://reqres.in/api/users/${uid}`)
    
    //Returning back with error if API is not working fine
    if(!users.ok){
        res.status(500).json({ data: [{ message: `Unable to fetch API`,}]})
    }

    //Storing data from users api to data const
    const { data } = await users.json()
    //Returning the response
    res.status(200).json({ data: data })
}
