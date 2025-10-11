import { useEffect, useState } from "react";
import { getApiData } from "../api/GetService";
import { Card } from "./Card";
import { Form } from "./Form";

export const MainContainer = () => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  const fetchApiData = async () => {
    try {
      const response = await getApiData();
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  return (
    <section className="container">
      <Form data={data} setData={setData} edit={edit} setEdit={setEdit} isEditable={isEditable} setIsEditable={setIsEditable}/>

      <ul className="card-container">
        {data.map((currData) => (
          <Card
            key={currData.id}
            currData={currData}
            data={data}
            setData={setData}
            edit={edit}
            setEdit={setEdit}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
          />
        ))}
      </ul>
    </section>
  );
};
