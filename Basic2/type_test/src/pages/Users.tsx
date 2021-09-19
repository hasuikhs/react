import React, { useEffect, useState } from "react";
import axios from "axios";
import UserList from "../components/UserList";

export interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export default function Users(): JSX.Element {
  
  const [users, setUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    axios.get<UserProps[]>('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      setUsers(response.data);
  });
  }, []);
  
  return (
    <>
      <h1>Users</h1>
      <UserList users={ users } />
    </>
  );
}