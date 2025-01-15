import { createFileRoute } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/start";
import { db } from "db";
import { usersTable } from "db/schema";
import { useState } from "react";
import z from "zod";

const createUser = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      name: z.string(),
      email: z.string(),
    })
  )
  .handler(async (ctx) => {
    await db.insert(usersTable).values(ctx.data);
    return `User ${ctx.data.name} created successfully!`;
  });

const getUsers = createServerFn({
  method: "GET",
}).handler(async () => {
  const allUsers = await db.select().from(usersTable);
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
    name: "John Doe",
    email: `john.doe+${users.length}@example.com`,
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel - Users List */}
      <div className="w-1/2 p-8 border-r border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Users List</h1>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Create User Form */}
      <div className="w-1/2 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Create New User
        </h1>
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
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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
