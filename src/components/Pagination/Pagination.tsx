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

  const { totalItems, setCurrentPage, currentPage, itemPerPage, pageRangeDisplayed } = props;

  const [pages = [], setPages] = useState<number[]>();

  const [pageRange = [], setPageRange] = useState<number[]>();

  const count = totalItems/itemPerPage;

  const set = (item: number)=> {
    const limit = itemPerPage * item;
    const offset = limit - itemPerPage;
    setCurrentPage({currentPage: item, limit, offset})
  }

  const nextPage = ()=>{
    if(currentNumber){
      if(count > currentNumber){
      const next = currentNumber +1;
      setCurrentNumber(next);
      set(next);
      const nextItem = next +1;

      if(nextItem <= count){
        setPageRange([next, nextItem]);
      }else{
        setPageRange([next])
      }
    }
    }
    return;
  }

  const previousPage = ()=>{
    if(currentNumber && currentNumber > 0){
      const prev = currentNumber - 1;
      if(prev > 0){
        setCurrentNumber(prev);
        set(prev);
        setPageRange([prev, prev +1]);
      }
      return;
    }
    return;
  }

  useEffect(()=>{
    setCurrentNumber(currentPage);
  }, [currentPage]);

  useEffect(()=>{
    let data = [];
    for(let i = 0; count > i; i++){
      data.push(i+1);
    }
    setPages(data);
    setPageRange(data.slice(0, pageRangeDisplayed));
    //eslint-disable-next-line
  }, []);


  return (
    <>
      <div>
        {/* <ul className="pages">
        {pages && pages.length > 0 && pages.map((item, i)=><li key={i} 
        className={item === currentNumber ? "activePage": ""} onClick={()=>set(item)}>{item}</li>)}
        </ul> */}

        <ul className="pages">
          {pageRange && pageRange.length > 0 && pageRange.map((item, i)=>
          <li key={i} onClick={()=>set(item)} 
          className={item === currentNumber ? "activePage": ""}>{item}</li>)}
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
