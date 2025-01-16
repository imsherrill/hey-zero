import { useQuery } from "@rocicorp/zero/react";
import { createFileRoute } from "@tanstack/react-router";
import { useZ } from "zero/hooks";

export const Route = createFileRoute("/usersZ/")({
  component: RouteComponent,
});

function RouteComponent() {
  const z = useZ();
  const [users, other] = useQuery(z.query.users);

  console.log({ users, other });

  if (!users) {
    return null;
  }

  return (
    <div className="p-4">
      {users.map((user) => (
        <div key={user.id} className="p-2 bg-gray-100 rounded mb-2">
          <div>{user.name}</div>
          <div className="text-gray-600">{user.email}</div>
        </div>
      ))}
    </div>
  );
}
