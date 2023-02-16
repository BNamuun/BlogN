export function CategList({ list }) {
  return (
    <>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.name} <button>Засах</button> <button> Хадгалах</button>{" "}
            <button> Устгах</button>
          </li>
        ))}
      </ul>
    </>
  );
}
