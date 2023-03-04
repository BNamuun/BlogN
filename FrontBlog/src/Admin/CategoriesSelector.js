import axios from "axios";
import { useEffect, useState } from "react";

export function CategoriesSelector({ value, onChange }) {
  const [categories, setGategories] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/categories").then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setGategories(data);
      } else {
        alert(`Error ${status}`);
      }
    });
  }, []);
  return (
    <div>
      <h1>Ангилал нэмэх</h1>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-select"
      >
        <option selected>Ангилал сонгох</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {" "}
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
