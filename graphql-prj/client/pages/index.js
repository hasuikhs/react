import MsgList from '../components/MsgList';
import { fetcher } from '../queryClient';

import { GET_MESSAGES } from '../graphql/message';
import { GET_USERS } from '../graphql/user';

function Home({ smsgs, users }) {
  return (
    <>
      <h1>SIMPLE SNS</h1>
      <MsgList smsgs={ smsgs } users={ users } />
    </>
  );
}

export const getServerSideProps = async () => {
  // 서버메시지
  const { messages: smsgs } = await fetcher(GET_MESSAGES);
  const { users } = await fetcher(GET_USERS);

  return {
    props: { smsgs, users }
  }
}

export default Home;