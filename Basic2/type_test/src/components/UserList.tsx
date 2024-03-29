import React from "react";
import { Link } from 'react-router-dom';
import { UserProps } from "../pages/Users";

function UserList({ users }: { users: UserProps[] }) {
  return (
    <div>
      {users.map(user => {
        return (
          <div className="card mb-2" key={user.id}>
            <div className="card-body p-3">
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserList;