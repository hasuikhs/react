import React from "react";

export default function UserList({ users }) {
  return (
    <div>
      { users.map(user => {
        return (
          <div key={ user.id }>
            { user.name }
          </div>
        )
      })}
    </div>
  );
}