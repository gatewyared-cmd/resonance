import { baseProcedure, createTRPCRouter } from "../inits";
export const appRouter = createTRPCRouter({
  health: baseProcedure.query(async () => {
 //   throw new Error("Something went wrong!")
 await new Promise((resolve)=> setTimeout(resolve, 5000))
    return { status: "ok", code:123 };
  }),
});
// export type definition of API d25c4f851e6089fb1f58a2bf6d1157fc
export type AppRouter = typeof appRouter;
