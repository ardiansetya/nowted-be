import { createFileRoute } from '@tanstack/react-router'
import { hc } from 'hono/client'
import type { AppType } from '../../../server/src/index'
import { useQuery } from '@tanstack/react-query'

const client = hc<AppType>('/')


export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const query = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const res = await client.api.
      return res.json()
    },
  })

  console.log(query.data)

  return <div>Hello RPC</div>
}

