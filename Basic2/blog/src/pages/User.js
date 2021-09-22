import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom'

function User() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      });
  }, [id]);

  const userDetail = loading ? <Spinner /> : (
    <div>
      <div>{user?.name}</div>
      <div>{user?.email}</div>
      <div>{user?.phone}</div>
    </div>
  )

  return (
    <>
      <h1>User Info</h1>
      {userDetail}
    </>
  );
}

export default User;