import { Component } from "solid-js"
import { useConnectionStatus } from "@triplit/solid"
import type { TriplitClient } from "@triplit/client"
import { client } from "../triplit/client"

export const ConnectionStatus: Component = () => {
  // Type assertion needed because useConnectionStatus expects TriplitClient<Models>
  // but our client has a more specific schema type
  const { status } = useConnectionStatus(client as unknown as TriplitClient)

  return (
    <div
      class="flex items-center gap-1 text-xs data-[online=true]:text-green-600 data-[online=false]:text-red-600"
      data-online={status() === "OPEN"}
    >
      <span class="text-xs">{status() === "OPEN" ? "🟢" : "🔴"}</span>
      <span>{status() === "OPEN" ? "Online" : "Offline"}</span>
    </div>
  )
}
