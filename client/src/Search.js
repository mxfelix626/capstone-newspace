import React from "react";
import { useState } from "react";
import SearchForm from "./forms/SearchForm";


const Search = () => {
    const [data, setData] = useState('');

    if (!data) return <SearchForm setData={setData} />

    return (
        <p>{data}</p>
    );
}

export default Search;
