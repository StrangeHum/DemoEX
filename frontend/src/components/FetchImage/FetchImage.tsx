import { useSelector } from "react-redux";
import styles from "./FetchImage.module.scss";
import { selectAccessToken } from "@src/redux/auth/authSlice";
import { useEffect, useState } from "react";
import axios from "axios";

export type FetchImageProps = {};

export const FetchImage = ({}: FetchImageProps) => {
  const accessToken = useSelector(selectAccessToken);

  const getFile = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const res = await fetch(
      "http://localhost:3000/orders/file/4",
      options
    ).then((response) => response.json());
    // .then((response) => console.log(response))
    // .catch((err) => console.error(err));

    console.log(res);
  };

  getFile();
  return <div className={styles.fetchImage}>FetchImage</div>;
};

export const FileDisplay = ({ fileId }) => {
  const [fileUrl, setFileUrl] = useState(null);
  // const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/orders/file/${fileId}`,
          {
            responseType: "blob", // чтобы получить файл в виде блоба
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // const url = URL.createObjectURL(response.data);
        const url = URL.createObjectURL(new Blob([response.data]));
        console.log(response.data);
        // setResponse(response);
        setFileUrl(url);
      } catch (err) {
        setError("Ошибка при загрузке файла");
      }
    };

    fetchFile();

    // Очистка URL-объекта при размонтировании компонента
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!fileUrl) {
    return <div>Загрузка...</div>;
  }

  // Определение типа файла (изображение или видео)
  const fileType = fileUrl.split(".").pop();

  if (["jpg", "jpeg", "png", "gif"].includes(fileType)) {
    return <img src={fileUrl} alt="Файл" />;
  }

  if (["mp4", "webm", "ogg"].includes(fileType)) {
    return <video src={fileUrl} controls />;
  }

  console.log(fileUrl);
  return <img src={fileUrl} />;
  return <div>Неизвестный формат файла</div>;
};

export default FetchImage;
