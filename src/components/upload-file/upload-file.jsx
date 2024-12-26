import { Image, Modal, message } from "antd";
import Upload from "antd/es/upload";
import Dragger from "antd/es/upload/Dragger";
import imageCompression from "browser-image-compression";
import { useState } from "react";
import { SlCloudUpload } from "react-icons/sl";
import { deleteFile, uploadFile } from "src/services/upload.service";

const extractContentFromHTML = (s) => {
  var span = document.createElement("span");
  span.innerHTML = s;
  return span.textContent || span.innerText;
};

const UploadFile = ({
  maxCount,
  onUpload,
  onRemove,
  setFiles,
  files,
  ...props
}) => {
  const { onChange, ...subProps } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const uploadImage = async (options) => {
    const { onSuccess, onError, file } = options;
    const formData = new FormData();
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1024,
    });
    formData.append("files", compressedFile);
    if (compressedFile.size > 300 * 1024) {
      messageApi.error("Kích thước file không được vượt quá 300KB!");
      return Upload.LIST_IGNORE;
    }
    if (maxCount === 1 && files.length > 0) {
      const match = files[0]?.match(/\/AzStudio\/([^/.]+)\./);
      const publicId = match ? match[1] : null;
      if (!publicId) {
        messageApi.error("Invalid file format.");
        return Upload.LIST_IGNORE;
      }
      await deleteFile(publicId);
      setFiles([]);
    }
    try {
      const res = await uploadFile(formData);
      if (res) {
        onUpload?.(res.urls[0]);
        setFiles((prevFiles) => [...prevFiles, res.urls[0]]);
        onSuccess && onSuccess(res);
      }
    } catch (err) {
      onError &&
        onError(new Error(extractContentFromHTML(err?.response?.data)));
    }
  };

  const handleBeforeUpload = async (file) => {
    try {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        messageApi.error("Bạn chỉ có thể tải lên tệp JPG/PNG!");
        return Upload.LIST_IGNORE;
      }
      return isJpgOrPng;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (info) => {
    const { status } = info.file;
    if (status === "done") {
      messageApi.success("Tải lên thành công");
    } else if (status === "error") {
      messageApi.error("Tải lên thất bại");
      return Upload.LIST_IGNORE;
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => setPreviewImage(reader.result);
    } else {
      setPreviewImage(file.url || file.preview);
    }

    setPreviewTitle(file.name || file.type);
    setPreviewOpen(true);
  };

  const handleRemove = async (info) => {
    if (info) {
      const imageUrl = info.response.urls[0];
      const publicId = imageUrl.match(/\/AzStudio\/([^/.]+)\./)[1];
      try {
        const resDeleteFile = await deleteFile(publicId);
        if (resDeleteFile) {
          messageApi.open({
            type: "success",
            content: "Xóa thành công",
          });
          setFiles((prevFiles) =>
            prevFiles.filter((file) => file !== imageUrl)
          );
        }
      } catch (error) {
        messageApi.open({
          type: "error",
          content: `${error?.response?.data?.message || error.message}`,
        });
      }
      onRemove && onRemove(publicId ?? info.uid);
    }
  };

  const propsUpload = {
    onChange: handleChange,
    multiple: true,
    beforeUpload: handleBeforeUpload,
    onRemove: handleRemove,
    listType: "picture-card",
    onPreview: handlePreview,
    className: `upload-image`,
    id: props.id,
    customRequest: uploadImage,
    maxCount: maxCount,
  };

  return (
    <>
      {contextHolder}
      <Dragger
        {...propsUpload}
        {...subProps}
        className="drag-upload-file-custom"
        style={{ marginBottom: "10px" }}
      >
        <p>
          <SlCloudUpload />
        </p>
        <p>
          <span>Click to upload</span> or drag and drop
        </p>
        <p>PNG, JPG</p>
      </Dragger>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <Image
          alt="image-preview"
          style={{ width: "100%" }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default UploadFile;
