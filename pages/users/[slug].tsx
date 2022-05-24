import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { SingleUser,Container,Card,CardImage,CardText } from '../../components/styled';
import { Loader } from '../../components/loader';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';

const User: NextPage = () => {
    //Using Router to get the query of the url
    const router = useRouter()
    const {slug} = router.query
    
    //Defining the states
    const [user, setUser] = useState<any>([]);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        if(!slug){
            return;
        }
        //Extracting userid from the slug
        const slugArr = (slug as string).split("-");
        const uid = slugArr[2];

        const fetchUser = async () => {
            //Calling the single user API
            const response = await fetch(`/api/users/${uid}`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json"
                },
            });
            const user = await response.json();
            //Updating the states
            setUser(user.data);
            setLoaded(true);
        }
        fetchUser();
    },[]);

  //Using loader if api isn't fetched yet
  if(!isLoaded){
      return (
          <Container>
              <Loader />
          </Container>
      )
  }else{
      return (
        <Layout>
          <Container>
             <SingleUser>
                    <Card>
                        <CardImage>
                            <img src={user.avatar} />
                        </CardImage>
                        <CardText>
                            {user.first_name+' '+user.last_name}<br/><br/>
                            <div>
                                <a href={'mailto:'+user.email}>
                                    {user.email}
                                </a>
                            </div>
                        </CardText>
                    </Card>
                </SingleUser>
          </Container>
        </Layout>
      )
  }
}

export default User
