import { Component, createSignal, createMemo, For } from "solid-js"
import { useQuery } from "@triplit/solid"
import { client } from "./triplit/client"

const App: Component = () => {
  const [newItem, setNewItem] = createSignal("")

  const { results: items, error, fetchingLocal } = useQuery(client, client.query("shopping_items"))

  const itemsArray = createMemo(() => {
    const itemsMap = items()
    return itemsMap ? Array.from(itemsMap.values()) : []
  })

  const addItem = async () => {
    const text = newItem().trim()
    if (text) {
      try {
        await client.insert("shopping_items", {
          text,
          completed: false,
        })
        setNewItem("")
      } catch (error) {
        console.error("Failed to add item:", error)
      }
    }
  }

  const toggleItem = async (id: string) => {
    try {
      const item = itemsArray().find((item) => item.id === id)
      if (item) {
        await client.update("shopping_items", id, {
          completed: !item.completed,
        })
      }
    } catch (error) {
      console.error("Failed to toggle item:", error)
    }
  }

  const removeItem = async (id: string) => {
    try {
      await client.delete("shopping_items", id)
    } catch (error) {
      console.error("Failed to remove item:", error)
    }
  }

  return (
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-md mx-auto py-8 px-4">
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">🐦 Shopping Bird</h1>

        <div
          class={`bg-white rounded-lg shadow-md p-6 mb-6 transition-opacity duration-200 ${fetchingLocal() ? "opacity-0" : "opacity-100"}`}
        >
          <div class="flex gap-2 mb-4">
            <input
              type="text"
              value={newItem()}
              onInput={(e) => setNewItem(e.currentTarget.value)}
              onKeyPress={(e) => e.key === "Enter" && addItem()}
              placeholder="Add a shopping item..."
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addItem}
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>

          <div class="space-y-2">
            <For each={itemsArray()}>
              {(item) => (
                <div class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleItem(item.id)}
                    class="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span class={`flex-1 ${item.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                    {item.text}
                  </span>
                  <button onClick={() => removeItem(item.id)} class="text-red-500 hover:text-red-700 text-sm">
                    Remove
                  </button>
                </div>
              )}
            </For>

            {itemsArray().length === 0 && (
              <p class="text-gray-500 text-center py-8">No items yet. Add your first shopping item above!</p>
            )}

            {error() && (
              <p class="text-red-500 text-center py-4">Error loading items: {error()?.message || "Unknown error"}</p>
            )}
          </div>
        </div>

        <div
          class={`text-center text-sm text-gray-500 transition-opacity duration-200 ${fetchingLocal() ? "opacity-0" : "opacity-100"}`}
        >
          <p>Offline first • Syncs with Google Keep</p>
        </div>
      </div>
    </div>
  )
}

export default App
