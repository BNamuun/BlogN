import axios from "axios";
import { useEffect, useState } from "react"

export function CategoriesSelector(){
    const [categories, setGategories] = useState([]);
    useEffect(() =>{
        axios.get("http://localhost:8000/categories").then((res) =>{
            const{data, status} = res;
            if(status === 200){
                setGategories(data)
            }else
            {
                alert(`Error ${status}`)
            }
        })
    } ,[])
    return (
        <div className="mx-4 d-flex flex-column gap-3">
        <h1>Ангилал нэмэх</h1>
        <select value={value} c lassName="form-select">
        <option selected>Ангилалгүй</option>
        {
            categories.map((category) => (
                <option key={category.id} value = {category.id}> {category.name}</option>
            ))
        }

        </select>
        <input className="form-control" ></input>
        </div>
    )
}