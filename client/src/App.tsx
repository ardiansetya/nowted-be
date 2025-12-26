import { hc } from "hono/client";
import type { AppType } from "../../server/index";
import { useEffect } from "react";

function App() {


  const client = hc<AppType>('/')
  const getData = async () => {
    const res = await client.api.
    console.log(res);
  }


  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <div>test</div>
    </>
  );
}

export default App;
