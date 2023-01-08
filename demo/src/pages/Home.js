import { Link } from 'react-router-dom';
import styled from 'styled-components';

import routes from '../routes';

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

function Home() {
  return (
    <MainDiv>
      연습장
      {
        routes.map(route => {
          return !route.children
                  ? <Link key={ route.name } to={ route.path }>{ route.name }</Link>
                  : (
                    <>
                      <div>{ route.name }</div>
                      {
                        route.children.map((childrenRoute, index) => {
                          return <li><Link key={ route.path + childrenRoute.path } to={ route.path + childrenRoute.path } >{ childrenRoute.name }</Link></li>;
                        })
                      }
                    </>
                  )
        })
      }
    </MainDiv>
  )
}

export default Home;