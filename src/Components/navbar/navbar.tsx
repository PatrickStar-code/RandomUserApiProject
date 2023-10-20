import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "phosphor-react";
import {  useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserContext } from "../../context";

export function Navbar() {
  const { user, SetNewList,FilterUsers} =
    useContext(UserContext);
  const schema = z.object({
    search: z.string().min(1),
  });

  type SearchData = z.infer<typeof schema>;

  function handleChange(event:React.ChangeEvent<HTMLSelectElement>) {
    FilterUsers(event.target.value);
  }
 

  function handleSearch(data: SearchData) {
    reset();
    const result = user.filter((user) => {
      return user.name.first.toLowerCase().includes(data.search.toLowerCase());
    });
    SetNewList(result);
  }
  const { reset, handleSubmit, register } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      search: "",
    },
  });
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          Table
        </a>
      </div>
      <div className="flex mr-3">
        <select className="select w-full max-w-xs" onChange={handleChange} defaultValue={""}>
          <option disabled value={""}>
            Filter
          </option>
          <option value={"Male"}>Male</option>
          <option value={"Female"}>Female</option>
          <option value={"All"}>All</option>
        </select>
      </div>
      <form onSubmit={handleSubmit(handleSearch)}>
        <div className="flex gap-1">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              {...register("search")}
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="form-control">
            <button className="btn btn-square">
              <MagnifyingGlass size={24} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
