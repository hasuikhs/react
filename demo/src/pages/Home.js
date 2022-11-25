import { Link } from 'react-router-dom';
import styled from 'styled-components';

import routes from '../routes';

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  color: gray;
`;

function Home() {
  return (
    <MainDiv>
      연습장
      {
        routes.filter(v => v.name !== 'NotFound').map(v => <Link key={ v.name } to={ v.path }>{ v.name }</Link>)
      }
    </MainDiv>
  )
}

export default Home;