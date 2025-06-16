import { Component, createSignal, createEffect, onCleanup } from "solid-js"

export const ConnectionStatus: Component = () => {
  const [isOnline, setIsOnline] = createSignal(navigator.onLine)

  createEffect(() => {
    // Update connection status based on browser's online/offline events
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    // Set initial state
    setIsOnline(navigator.onLine)

    // Listen for online/offline events
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    onCleanup(() => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    })
  })

  const getStatusIcon = () => {
    return isOnline() ? "🟢" : "🔴"
  }

  const getStatusText = () => {
    return isOnline() ? "Online" : "Offline"
  }

  const getStatusColor = () => {
    return isOnline() ? "text-green-600" : "text-red-600"
  }

  return (
    <div class={`flex items-center gap-1 text-xs ${getStatusColor()}`}>
      <span class="text-xs">{getStatusIcon()}</span>
      <span>{getStatusText()}</span>
    </div>
  )
}
