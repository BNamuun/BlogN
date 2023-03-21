import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CategoriesSelector } from "./CategoriesSelector";
import { useArticles } from "./useArticles";

const size = 10;
export function Articles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState();
  const [categoryId, setCategoryId] = useState("");
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const { list, count } = useArticles("", page, size, categoryId);
  // console.log({ list });
  useEffect(() => {
    if (count) {
      setPages(Math.ceil(count / size));
    }
  }, [count]);

  // below useEffect is works once, next time return work when categoryId changes;
  useEffect(() => {
    setSearchParams({ page: 1 });
  }, [categoryId]);

  console.log({ list });

  return (
    <div className="container">
      {/* <Link to="/admin/listOfTemplates" className="btn btn-primary">
        {" "}
        Шинэ мэдээ
      </Link> */}
      {/* <h1>khkjhkjhkljh lkjhl jh</h1> */}
      <CategoriesSelector
        value={categoryId}
        onChange={(val) => setCategoryId(val)}
      />
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th> Гарчиг</th>
            <th> Ангилал</th>
          </tr>
        </thead>
        <tbody>
          {list.map((article) => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{article.categoryName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {page !== 1 && (
            <li className="page-item">
              <Link to={`?page=${page - 1}`} className="page-link">
                Өмнөх
              </Link>
            </li>
          )}

          {/* ...Array(10) == Ex: 10 hurtel [1,2,3... etc] will be created*/}
          {[...Array(pages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${page === index + 1 ? "active" : ""}`}
            >
              {/* first by order, settingParams to page  */}
              <Link to={`?page=${index + 1}`} className="page-link">
                {index + 1}
              </Link>
            </li>
          ))}
          {page !== pages && (
            <li className="page-item">
              <Link to={`?page=${page + 1}`} className="page-link">
                Дараах
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
