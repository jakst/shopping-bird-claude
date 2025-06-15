export { ShoppingListDurableObject } from "./durable-object"

export interface Env {
  SHOPPING_LIST: DurableObjectNamespace
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    // Handle CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      })
    }

    // Route API requests
    if (url.pathname.startsWith("/api/")) {
      const id = env.SHOPPING_LIST.idFromName("default")
      const obj = env.SHOPPING_LIST.get(id)

      const response = await obj.fetch(request)

      // Add CORS headers to response
      const corsResponse = new Response(response.body, response)
      corsResponse.headers.set("Access-Control-Allow-Origin", "*")
      corsResponse.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
      corsResponse.headers.set("Access-Control-Allow-Headers", "Content-Type")

      return corsResponse
    }

    // Serve static files (in production, this would be handled differently)
    return new Response("Not found", { status: 404 })
  },
}
