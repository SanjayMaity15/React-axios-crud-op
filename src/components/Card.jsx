import { deleteApiData } from "../api/GetService";

export const Card = ({
  currData,
  data,
  setData,
  edit,
  setEdit,
  isEditable,
  setIsEditable,
}) => {
  const { id, title, body } = currData;

  const handleDeleteApiData = async (id) => {
    try {
      deleteApiData(id);
      const updatedData = data.filter((currData) => currData.id !== id);

      setData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    handleDeleteApiData(id);
  };

  const handleEdit = (currData) => {
    setEdit(currData);
    setIsEditable(true)
  }

  return (
    <li className="card">
      <span>{id}</span>
      <p>TITLE : {title}</p>
      <p>BODY : {body}</p>
      <div className="two-btn">
        <button onClick={() => handleEdit(currData)}>Edit</button>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </div>
    </li>
  );
};
