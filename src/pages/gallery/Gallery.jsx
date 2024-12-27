import FolderIcon from "@mui/icons-material/Folder";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListLibrary } from "src/services/library.service";
import "./Gallery.css";

const Gallery = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const usernameCurrent = localStorage.getItem("username");

  const [listFolder, setListFolder] = useState([]);

  useEffect(() => {
    if (usernameCurrent !== username) {
      navigate("/");
    }
    const fetchData = async () => {
      try {
        const res = await getListLibrary(username);
        if (res) {
          setListFolder(res?.data);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="gallery-container">
      <div
        className="gallery-image-list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "16px",
        }}
      >
        {listFolder.map((folder, index) => (
          <div
            key={index}
            className="folder-item"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "15px 10px",
              backgroundColor: "#f0f3f8",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => navigate(`/gallery/${username}/${folder?._id}`)}
          >
            <div
              className="folder-icon"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "4px",
                marginRight: "16px",
              }}
            >
              <FolderIcon style={{ fontSize: "40px", color: "#454746" }} />
            </div>
            <div
              className="folder-name"
              style={{ fontSize: "18px", color: "#333", fontWeight: "500" }}
            >
              {folder?.category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
