import React, { useEffect, useState } from "react";
import "./styles.css";
import { Pagination } from "./components";

const storage = [
  "kimpama",
  "arsene",
  "gratien",
  "tuyishimire",
  "prince",
  "mucyo",
  "kwitonda",
  "grace",
  "malvin",
  "sebo",
  "rugamba",
  "runonga",
  "mutabazi",
  "herbert",
  "heritier",
];

export default function App() {
  const itemPerPage = 5;

  const [currentPage = 1, setCurrentPage] = useState<number>();

  const [offset = 0, setOffset] = useState<number>();

  const [items = [], setItems] = useState<string[]>();

  const [limit = itemPerPage, setLimit] = useState<number>();

  const totalItems = storage.length;

  const loadDatas = (data: {offset: number; limit: number})=>{
    setItems(storage.slice(data.offset, data.limit))
  };

  useEffect(()=>{
    loadDatas({offset, limit});
    //eslint-disable-next-line
  }, []);


  return (
    <div className="App">
      <h1>Names</h1>
      <div className="listItems">
      <ul>
      {items &&
        items.length > 0 &&
        items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={(v) => {
          setCurrentPage(v.currentPage);
          setLimit(v.limit);
          setOffset(v.offset);
          loadDatas({offset: v.offset, limit: v.limit});
        }}
        totalItems={totalItems}
        itemPerPage={itemPerPage}
        pageRangeDisplayed={2}
      />
    </div>
  );
}
