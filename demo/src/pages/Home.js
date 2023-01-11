import { Link } from 'react-router-dom';
import styled from 'styled-components';

import routes from '../routes';

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 10px;
  width: 900px;
`;

const Card = styled.div`
  width: 160px;
  height: 200px;
  border: 1px solid black;
  border-radius: 20px;
  box-shadow: 1px;
  margin: 10px;
  padding: 20px;
  transition: 0.7s;
  &: hover {
    background-color: #E3F2FD;
    border: 1px solid #90CAF9;
  }
`;

function Home() {
  return (
    <>
      <h1>연습장</h1>
      <MainContainer>
        {
          routes.map(route => {
            return !route.children
                    ? (
                        <Card>
                          <Link key={ route.name } to={ route.path }>{ route.name }</Link>
                        </Card>
                      )
                    : (
                        <Card>
                          { route.name }
                          <ul>
                            {
                              route.children.map((childrenRoute, index) => {
                                return <li><Link key={ route.path + childrenRoute.path } to={ route.path + childrenRoute.path } >{ childrenRoute.name }</Link></li>
                              })
                            }
                          </ul>
                        </Card>
                      )
          })
        }
      </MainContainer>
    </>
  )
}

export default Home;