import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Grid,Item,Container,Card,CardImage,CardText,Button } from '../components/styled';
import { Loader } from '../components/loader';
import Header from '../components/header';
import Layout from '../components/layout';

const Home: NextPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
      const fetchUsers = async () => {
          const response = await fetch(`/api/users`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          });
          const users = await response.json();
          setUsers(users.data);
          setLoaded(true);
      }
      fetchUsers();
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
                <Grid>
                    {
                        users.map((user) => {
                            return (
                                <Item key={user.id}>
                                    <Card>
                                        <CardImage>
                                            <img src={user.avatar} />
                                        </CardImage>
                                        <CardText>
                                            {user.first_name+' '+user.last_name}
                                        </CardText>
                                        <Link href={"/users/"+user.first_name.toLowerCase()+"-"+user.last_name.toLowerCase()+"-"+user.id}> 
                                            <Button>
                                                <button>View User</button>
                                            </Button>
                                        </Link>
                                    </Card>
                                </Item>
                            )
                        })
                    }
                </Grid>
            </Container>
          </Layout>
      )
  }
}

export default Home
