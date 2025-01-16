import { useQuery } from "@rocicorp/zero/react";
import { createFileRoute } from "@tanstack/react-router";
import { useZ } from "zero/hooks";
import { UserCard } from "~/components/UserCard";

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
    <div className="space-y-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
