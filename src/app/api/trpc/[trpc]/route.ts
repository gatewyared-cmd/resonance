import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/trpc/routers/_app";
import { createTRPCContext } from "@/trpc/inits";

const handler = async (req: Request) => {
  return await fetchRequestHandler({
    router: appRouter,
    req,
    endpoint: "/api/trpc",
    createContext: () => createTRPCContext(),
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? "<no-path>"}:`, error);
          }
        : undefined,
  });
};

export { handler as GET, handler as POST };
