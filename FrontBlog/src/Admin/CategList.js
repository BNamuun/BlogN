import axios from "axios";
export function CategList({ list }) {
  function DeleteCat(id) {
    axios.delete(`http://localhost:8000/categories/${id}`).then((res) => {
      const { data, status } = res;
      if (status === 200) {
      }
    });
  }
  return (
    <>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.name} <button>Засах</button> <button> Хадгалах</button>{" "}
            <button onClick={() => DeleteCat(item.id)}> Устгах</button>
          </li>
        ))}
      </ul>
    </>
  );
}
