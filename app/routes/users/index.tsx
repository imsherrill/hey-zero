import { createFileRoute } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/start";
import { prisma } from "prisma/db";
import { useState } from "react";
import z from "zod";
import { UserCard } from "~/components/UserCard";
// import { UserCard } from "~/components/UserCard";

const createUser = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      name: z.string(),
    })
  )
  .handler(async (ctx) => {
    await prisma.user.create({
      data: ctx.data,
    });
    return `User ${ctx.data.name} created successfully!`;
  });

const getUsers = createServerFn({
  method: "GET",
}).handler(async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
});

export const Route = createFileRoute("/users/")({
  loader: async () => {
    return getUsers();
  },
  component: RouteComponent,
});

function RouteComponent() {
  const users = Route.useLoaderData();

  const [formData, setFormData] = useState({
    name: `John Doe+${users.length}`,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createNewUser = useServerFn(createUser);

  return (
    <div className="flex">
      {/* Left Panel - Users List */}
      <div className="w-1/2 p-8 border-r border-gray-200">
        <SectionTitle>Users List</SectionTitle>
        <div className="space-y-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>

      {/* Right Panel - Create User Form */}
      <div className="w-1/2 p-8">
        <SectionTitle>Create New User</SectionTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createNewUser({ data: formData });
          }}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <h2 className="text-xl font-bold text-gray-900 mb-4">{children}</h2>;
}
