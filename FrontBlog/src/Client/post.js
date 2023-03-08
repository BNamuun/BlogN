export function Posts({ posts, loading }) {
  if (loading) {
    return <h2> Loading... </h2>;
  }
  return (
    <>
      {/* <ul className="list-group mb-4">
        {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {" "}
            {post.title}
          </li>
        ))}
      </ul> */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Гарчиг</th>
            <th>Ангилал</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((article) => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{article.categoryId}</td>
              <td>{article.category?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
