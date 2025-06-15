import { Component, createSignal, For } from 'solid-js';

interface ShoppingItem {
  id: string;
  text: string;
  completed: boolean;
}

const App: Component = () => {
  const [items, setItems] = createSignal<ShoppingItem[]>([]);
  const [newItem, setNewItem] = createSignal('');

  const addItem = () => {
    const text = newItem().trim();
    if (text) {
      setItems([
        ...items(),
        {
          id: Date.now().toString(),
          text,
          completed: false,
        },
      ]);
      setNewItem('');
    }
  };

  const toggleItem = (id: string) => {
    setItems(items().map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items().filter(item => item.id !== id));
  };

  return (
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-md mx-auto py-8 px-4">
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">
          🐦 Shopping Bird
        </h1>
        
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex gap-2 mb-4">
            <input
              type="text"
              value={newItem()}
              onInput={(e) => setNewItem(e.currentTarget.value)}
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
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
            <For each={items()}>
              {(item) => (
                <div class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleItem(item.id)}
                    class="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span
                    class={`flex-1 ${
                      item.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-800'
                    }`}
                  >
                    {item.text}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    class="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              )}
            </For>
            
            {items().length === 0 && (
              <p class="text-gray-500 text-center py-8">
                No items yet. Add your first shopping item above!
              </p>
            )}
          </div>
        </div>
        
        <div class="text-center text-sm text-gray-500">
          <p>Offline first • Syncs with Google Keep</p>
        </div>
      </div>
    </div>
  );
};

export default App;