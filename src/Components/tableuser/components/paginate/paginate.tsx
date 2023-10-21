
export const Paginate = ({TotalItens, ItensPerPage,setCurrentPages,currentPage}: {TotalItens: number, ItensPerPage: number , setCurrentPages: React.Dispatch<React.SetStateAction<number>>, currentPage: number}) => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(TotalItens/ItensPerPage); i++) {
        pages.push(i)   

    }
    
  return (
    
    <div className="join flex justify-center mb-4">
        {pages.map((page) => (
            <button key={page}
            className={page === currentPage ? "join-item btn btn-active" : "join-item btn"}
             onClick={()=>setCurrentPages(page)}>{page}</button>
        ))}
    </div>
  )
}
