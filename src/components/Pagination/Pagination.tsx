import React, { useState, useEffect } from "react";

interface Props {
  totalItems: number;
  itemPerPage: number;
  setCurrentPage: (data: {currentPage: number; limit: number; offset: number}) => void;
  currentPage: number;
  pageRangeDisplayed: number;
}
const PaginationComponent = (props: Props) => {
  const [currentNumber, setCurrentNumber] = useState<number>();

  const { totalItems, setCurrentPage, currentPage, itemPerPage } = props;

  const [pages = [], setPages] = useState<number[]>();

  const count = totalItems/itemPerPage;

  useEffect(()=>{
    setCurrentNumber(currentPage);
  }, [currentPage]);

  useEffect(()=>{
    let data = [];
    for(let i = 0; count > i; i++){
      data.push(i+1);
    }
    setPages(data);
    //eslint-disable-next-line
  }, [])

  const nextPage = ()=>{
    if(currentNumber){
      if(count > currentNumber){
      const next = currentNumber +1;
      const limit = itemPerPage * next;
      const offset = limit - itemPerPage;
      setCurrentNumber(next);
      setCurrentPage({currentPage: next, limit, offset });
    }
    }
    return;
  }

  const previousPage = ()=>{
    if(currentNumber && currentNumber > 0){
      const prev = currentNumber - 1;
      if(prev > 0){
        const limit = itemPerPage * prev;
        const offset = limit - itemPerPage;
        setCurrentNumber(prev);
        setCurrentPage({currentPage: prev, limit, offset });
      }
      return;
    }
    return;
  }

  return (
    <>
      <div>
        <ul className="pages">
        {pages && pages.length > 0 && pages.map((item, i)=><li key={i} 
        className={item === currentNumber ? "activePage": ""} onClick={()=>{
          const limit = itemPerPage * item;
            const offset = limit - itemPerPage;
            setCurrentPage({currentPage: item, limit, offset})
        }}>{item}</li>)}
        </ul>
        <div className="button">
        <button type="button" onClick={nextPage}>next</button>
        <button type="button" onClick={previousPage}>previous</button>
        </div>
      </div>
    </>
  );
};

export default PaginationComponent;
