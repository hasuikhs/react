import React from "react";
import { UserProps } from "../pages/Users";

export default function UserList({ users }: { users: UserProps[]}) {
  return (
    <div>
      { users.map(user => {
        return (
          <div key={user.id}>
            {user.name}
          </div>
        );
      })}
    </div>
  );
}