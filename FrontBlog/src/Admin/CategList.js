export function CategList({ list }) {
  return (
    <>
      <ul>
        {list.map((item) => (
          <li>
            {item} <button>Засах</button> <button> Хадгалах</button>
          </li>
        ))}
      </ul>
    </>
  );
}
