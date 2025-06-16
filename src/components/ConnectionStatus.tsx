import { Component } from "solid-js"
import { useConnectionStatus } from "@triplit/solid"
import type { TriplitClient } from "@triplit/client"
import { client } from "../triplit/client"

export const ConnectionStatus: Component = () => {
  // Type assertion needed because useConnectionStatus expects TriplitClient<Models>
  // but our client has a more specific schema type
  const { status } = useConnectionStatus(client as unknown as TriplitClient)

  const getStatusIcon = () => {
    return status() === "OPEN" ? "🟢" : "🔴"
  }

  const getStatusText = () => {
    return status() === "OPEN" ? "Online" : "Offline"
  }

  const getStatusColor = () => {
    return status() === "OPEN" ? "text-green-600" : "text-red-600"
  }

  return (
    <div class={`flex items-center gap-1 text-xs ${getStatusColor()}`}>
      <span class="text-xs">{getStatusIcon()}</span>
      <span>{getStatusText()}</span>
    </div>
  )
}
