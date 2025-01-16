// These data structures define your client-side schema.
// They must be equal to or a subset of the server-side schema.
// Note the "relationships" field, which defines first-class
// relationships between tables.
// See https://github.com/rocicorp/mono/blob/main/apps/zbugs/src/domain/schema.ts
// for more complex examples, including many-to-many.

import {
  createSchema,
  createTableSchema,
  definePermissions,
  ExpressionBuilder,
  TableSchema,
  Row,
  NOBODY_CAN,
  ANYONE_CAN,
} from "@rocicorp/zero";

const usersSchema = createTableSchema({
  tableName: "users",
  columns: {
    id: { type: "number" },
    name: { type: "string" },
    email: { type: "string" },
  },
  primaryKey: ["id"],
});

export const schema = createSchema({
  version: 1,
  tables: {
    users: usersSchema,
  },
});

export type Schema = typeof schema;

// The contents of your decoded JWT.
type AuthData = {
  sub: string | null;
};

export const permissions = definePermissions<AuthData, Schema>(schema, () => {
  const allowIfLoggedIn = (
    authData: AuthData,
    { cmpLit }: ExpressionBuilder<TableSchema>
  ) => cmpLit(authData.sub, "IS NOT", null);

  // const allowIfMessageSender = (
  //   authData: AuthData,
  //   { cmp }: ExpressionBuilder<typeof messageSchema>
  // ) => cmp("senderID", "=", authData.sub ?? "");

  return {
    // medium: {
    //   row: {
    //     insert: NOBODY_CAN,
    //     update: {
    //       preMutation: NOBODY_CAN,
    //     },
    //     delete: NOBODY_CAN,
    //   },
    // },
    users: {
      row: {
        insert: ANYONE_CAN,
        update: {
          preMutation: ANYONE_CAN,
        },
        delete: NOBODY_CAN,
      },
    },
    // message: {
    //   row: {
    //     // anyone can insert
    //     insert: ANYONE_CAN,
    //     // only sender can edit their own messages
    //     update: {
    //       preMutation: [allowIfMessageSender],
    //     },
    //     // must be logged in to delete
    //     delete: [allowIfLoggedIn],
    //   },
    // },
  };
});
