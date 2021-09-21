import React from "react";
import { UserProps } from "../pages/Users";

export default function UserList({ users }: { users: UserProps[] }) {
  return (
    <div>
      {users.map(user => {
        return (
          <div className="card mb-2" key={user.id}>
            <div className="card-body p-3">
              {user.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}