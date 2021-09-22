import React, { useEffect, useState } from "react";
import axios from "axios";
import UserList from "../components/UserList";
import Spinner from "../components/Spinner";

export interface UserProps {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
}

function Users(): JSX.Element {

  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios.get<UserProps[]>('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1>Users</h1>
      {loading ? <Spinner /> : <UserList users={users} />}
    </>
  );
}

export default Users;