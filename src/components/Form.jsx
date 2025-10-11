import { useEffect, useState } from "react";
import { postApiData, putApiData } from "../api/GetService";

export const Form = ({
  data,
  setData,
  edit,
  setEdit,
  isEditable,
  setIsEditable,
}) => {
  // store input value

  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  // edit data store

  useEffect(() => {
    edit &&
      setAddData({
        title: edit.title || "",
        body: edit.body || "",
      });
  }, [edit]);

  // stote the value

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({ ...prev, [name]: value }));
  };

  // update the api using post

  const handleDataToPost = async () => {
    try {
      const isEmpty = Object.values(addData).every(
        (value) => value.trim() !== ""
      );

      if (!isEmpty) return;
      const response = await postApiData(addData);
      if (response.status === 201) {
        setData((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update

  const handleUpdate = async () => {
    try {
      const res = await putApiData(edit.id, addData);

      setData((prev) => {
        return prev.map((currElem) => {
          return currElem.id === res.data.id ? res.data : currElem;
        });
      });
      setAddData({ title: "", body: "" });
      setIsEditable(false);
    } catch (error) {
      console.log(error);
    }
  };

 // Form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;

    if (action === "add") {
      handleDataToPost();
    } else if (action === "edit") {
      handleUpdate();
    }
  };

  return (
    <section>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input
            type="text"
            name="title"
            value={addData.title}
            onChange={handleInputChange}
            placeholder="title content"
          />
        </div>
        <div>
          <input
            type="text"
            name="body"
            value={addData.body}
            onChange={handleInputChange}
            placeholder="body content"
          />
        </div>
        <div>
          <button
            type="submit"
            className="submit"
            value={isEditable ? "edit" : "add"}
          >
            {isEditable ? "EDIT" : "ADD"}
          </button>
        </div>
      </form>
    </section>
  );
};
