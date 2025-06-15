import { Schema as S } from "@triplit/db"

export const schema = {
  shopping_items: {
    schema: S.Schema({
      id: S.Id(),
      text: S.String(),
      completed: S.Boolean({ default: false }),
      created_at: S.Date({ default: S.Default.now() }),
      updated_at: S.Date({ default: S.Default.now() }),
    }),
  },
} satisfies S.Schema
