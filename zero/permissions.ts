import {
  definePermissions,
  ANYONE_CAN,
  NOBODY_CAN,
  Schema,
} from "@rocicorp/zero";

export function buildPermissions(schema: Schema) {
  return definePermissions(schema, () => {
    return {
      user: {
        row: {
          insert: ANYONE_CAN,
          update: {
            preMutation: ANYONE_CAN,
          },
          delete: NOBODY_CAN,
        },
      },
    };
  });
}
