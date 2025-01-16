import { User } from "~/utils/users";

type UserCardProps = {
  user: User;
};

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <p className="font-semibold text-lg text-gray-900">{user.name}</p>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
}
