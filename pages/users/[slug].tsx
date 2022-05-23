import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { SingleUser,Container,Card,CardImage,CardText } from '../../components/styled';
import { Loader } from '../../components/loader';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';

const User: NextPage = () => {

    const router = useRouter()
    const {slug} = router.query
    
    const [user, setUser] = useState<any>([]);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        if(!slug){
            return;
        }
        const slugArr = (slug as string).split("-");
        const uid = slugArr[2];

        const fetchUser = async () => {
            const response = await fetch(`/api/users/${uid}`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json"
                },
            });
            const user = await response.json();
            setUser(user.data);
            setLoaded(true);
        }
        fetchUser();
    },[]);

  
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
