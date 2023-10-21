/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from "react";
import { UserContext } from "../../context";
import { Paginate } from "./components/paginate/paginate";

export function TableUser() {
  const [currentUser, setCurrentUser] = useState<number>(0);	
const {UserList,loading,setCurrentPage,currentPage,itemsPerPage} = useContext(UserContext);

  function setDetailsModal(uuid : string) {
    const index = UserList.findIndex((user) => user.login.uuid === uuid);
    setCurrentUser(index)
  }

  const LastItemIndex = currentPage * itemsPerPage;
  const FirstItemIndex = LastItemIndex - itemsPerPage;
  const currentItems = UserList.slice(FirstItemIndex, LastItemIndex);

  return (
    <>
    <Paginate TotalItens={UserList.length} ItensPerPage={itemsPerPage} setCurrentPages={setCurrentPage} currentPage={currentPage}/>
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            loading && 
           <tr><td  colSpan={4} className="text-center pt-6"><span className="loading loading-ring loading-lg"></span></td></tr>
          }
          {UserList.length === 0 && loading === false ? 
          <tr><td colSpan={4} className="text-center p-6"><span className="text-2xl font-mono">No Data !! &#x1F614;</span></td></tr> : currentItems.map((user) => (
            <tr key={user.login.uuid}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={user.picture.medium}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">
                      {user.name.first} {user.name.last}
                    </div>
                    <div className="text-sm opacity-50">
                      {user.location.city}, {user.location.country}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <span className="uppercase">{user.gender}</span>
              </td>
              <td className="text-sm opacity-50 flex flex-col">
                <span>{user.dob.date.slice(0, 10).replace(/-/g, "/")}</span>
                <span className="badge badge-ghost mt-1">
                   AGE:{user.dob.age}
                </span>
              </td>
              <th>
                <button  onClick={  () => {
                    const modal = document.getElementById(
                      "DetailsModal"
                    ) as HTMLDialogElement;
                    modal.showModal();
                    setDetailsModal(user.login.uuid)
                  }} className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
          <th>Name</th>
            <th>Gender</th>
            <th>Birth</th>
            <th>Actions</th>
          </tr>
        </tfoot>
      </table>
    </div>
    <dialog id="DetailsModal" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello! {UserList[currentUser]?.name.first}</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </>


  );
}
