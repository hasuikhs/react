import React, { useState, useEffect } from "react";
import axios from 'axios';
import UserList from "../components/UserList";
import Spinner from "../components/Spinner";

export default function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
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