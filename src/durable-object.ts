export interface ShoppingItem {
  id: string
  text: string
  completed: boolean
  createdAt: number
  updatedAt: number
}

export class ShoppingListDurableObject {
  private storage: DurableObjectStorage
  private items: Map<string, ShoppingItem> = new Map()

  constructor(state: DurableObjectState) {
    this.storage = state.storage
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname.replace("/api", "")

    switch (request.method) {
      case "GET":
        return this.handleGet(path)
      case "POST":
        return this.handlePost(path, request)
      case "PUT":
        return this.handlePut(path, request)
      case "DELETE":
        return this.handleDelete(path)
      default:
        return new Response("Method not allowed", { status: 405 })
    }
  }

  private async handleGet(path: string): Promise<Response> {
    if (path === "/items") {
      await this.loadItems()
      const itemsArray = Array.from(this.items.values())
      return new Response(JSON.stringify(itemsArray), {
        headers: { "Content-Type": "application/json" },
      })
    }
    return new Response("Not found", { status: 404 })
  }

  private async handlePost(path: string, request: Request): Promise<Response> {
    if (path === "/items") {
      const data = (await request.json()) as { text: string }
      const item: ShoppingItem = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        text: data.text,
        completed: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }

      this.items.set(item.id, item)
      await this.storage.put(`item:${item.id}`, item)

      return new Response(JSON.stringify(item), {
        headers: { "Content-Type": "application/json" },
        status: 201,
      })
    }
    return new Response("Not found", { status: 404 })
  }

  private async handlePut(path: string, request: Request): Promise<Response> {
    const match = path.match(/\/items\/(.+)/)
    if (match) {
      const id = match[1]
      const data = (await request.json()) as Partial<ShoppingItem>

      await this.loadItems()
      const existingItem = this.items.get(id)

      if (!existingItem) {
        return new Response("Item not found", { status: 404 })
      }

      const updatedItem: ShoppingItem = {
        ...existingItem,
        ...data,
        id, // Ensure ID cannot be changed
        updatedAt: Date.now(),
      }

      this.items.set(id, updatedItem)
      await this.storage.put(`item:${id}`, updatedItem)

      return new Response(JSON.stringify(updatedItem), {
        headers: { "Content-Type": "application/json" },
      })
    }
    return new Response("Not found", { status: 404 })
  }

  private async handleDelete(path: string): Promise<Response> {
    const match = path.match(/\/items\/(.+)/)
    if (match) {
      const id = match[1]

      await this.loadItems()

      if (!this.items.has(id)) {
        return new Response("Item not found", { status: 404 })
      }

      this.items.delete(id)
      await this.storage.delete(`item:${id}`)

      return new Response(null, { status: 204 })
    }
    return new Response("Not found", { status: 404 })
  }

  private async loadItems(): Promise<void> {
    if (this.items.size === 0) {
      const itemsMap = await this.storage.list({ prefix: "item:" })
      for (const [key, item] of itemsMap) {
        this.items.set((item as ShoppingItem).id, item as ShoppingItem)
      }
    }
  }
}
