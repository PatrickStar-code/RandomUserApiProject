import { Navbar } from "./Components/navbar/navbar";
import { TableUser } from "./Components/tableuser/tableuser";
import { ContextProvdier } from "./context";

export function App() {

  return (
    <ContextProvdier>
      <Navbar/>
      <TableUser/>
    </ContextProvdier>
  )
}
