import { useState } from "react";
import { useSearchParams } from "react-router-dom"

export function Articles(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [pages, setPages] = useState();
    const [categoryId, setCategoryId] = useState("");
    
    return(<>
    </>)
}