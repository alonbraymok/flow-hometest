import EditCard from "../edit.card/edit.card";
import { usePaginatedFetch } from "hooks";
import { useState, useCallback } from "react";
import "./blog.post.table.css";
import { BASE_URL, EDIT_TYPE } from "utils/constans";

export default function BlogPostsTable() {
  const [page, setPage] = useState<number>(1);
  const [currentEditItem, setCurrentEditItem] = useState<any>(null);

  const { data, loading, error, users } = usePaginatedFetch(
    `${BASE_URL}posts?_page=${page}&_embed=comments&_limit=10`
  );

  function renderTableRow() {
    return data.map((post: any) => (
      <tr key={post.id}>
        <td>{post.id}</td>
        <td
          onClick={() =>
            setCurrentEditItem({ value: post, type: EDIT_TYPE.TITLE })
          }
        >
          {post.title}
        </td>
        <td
          onClick={() =>
            setCurrentEditItem({
              value: users?.[post.userId],
              type: EDIT_TYPE.NAME,
            })
          }
        >
          {users?.[post.userId]?.name}
        </td>
        <td
          onClick={() =>
            setCurrentEditItem({
              value: users?.[post.userId],
              type: EDIT_TYPE.COMPANY,
            })
          }
        >
          {users?.[post.userId]?.company?.name}
        </td>
        <td>{post.comments.length}</td>
      </tr>
    ));
  }

  const onEditFinisih = useCallback(() => {
    setCurrentEditItem(null);
  }, []);

  if (loading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <table id="myTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Name</th>
            <th>Comapny</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>{renderTableRow()}</tbody>
      </table>
      <button
        onClick={() => setPage((prevState): any => setPage(prevState + 1))}
      >
        Next
      </button>
      {currentEditItem && (
        <EditCard item={currentEditItem} onFinish={onEditFinisih} />
      )}
    </>
  );
}
