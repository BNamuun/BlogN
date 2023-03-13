import axios from "axios";
import { useEffect } from "react";

export function useArticles(){
    const [list, setList] = useState([]);
    const [count, setCount] = useState();
    function loadArticles(){
        axios.get(`http://localhost:8000/articles?q=${query}&page${page}&size=${size}&categoryId=${categoryId}`).then((res) =>{
            const {data, status} = res;
            if (status === 200) {
                const {list, count} = res;
                setList(list)
                setCount(count)
            }else{
                alert(`Aldaa garlaa: ${status}`)
            }
        })
    }
    useEffect(() => {
        loadArticles();
    }, [page, query, categoryId]);
    return{
        list, count
    }
}