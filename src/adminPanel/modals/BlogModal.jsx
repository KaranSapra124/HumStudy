import { useState, useEffect } from "react";
import Modal from "../../components/modals/Modal";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  NormalInput,
  TextareaInput,
} from "../../components/inputs/ModalInputs";
import { FILE_PATH } from "../../utils/apiConfig";

export default function BlogModal({ saveFunc, setIsModal, view, editItem }) {
  const [modal, setModal] = useState(true);
  const [data, setData] = useState({});
  const BlogData = new FormData();

  const handleDataChange = (name = null, value) => {
    if (!name) return;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // const newData = {
    //   ...editItem,
    //   ...data,
    // };

    if (view === "edit") {
      saveFunc(data);
      setModal(false);
    } else {
      Object.keys(data).forEach((val) => {
        const value = data[val];
        BlogData.append(val, value);
      });
      // console.log(data?.img);
      // BlogData.append("blogImg", data?.img);
      saveFunc(BlogData);
      setModal(false);
    }
  };
  const putValues = () => {
    setData(editItem);
    setData((prev) => ({
      ...prev,
      img: editItem?.blogImg,
    }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (view === "edit") putValues();
  }, [editItem]);

  const editorConfig = {
    uiSettings: {
      contentCss: {
        height: "300px", // Set the maximum height for the editor
      },
    },
  };

  function handleImgUpload(e) {
    // console.log(e.target.files[0]);
    handleDataChange("img", e.target.files[0]);
  }

  return (
    <Modal
      setIsModal={setIsModal}
      modal={modal}
      modalStyles={{ width: "1000px" }}
    >
      <h2>{view === "edit" ? "Edit" : "Add"} Blog</h2>
      <form
        onSubmit={handleSave}
        className="flex flex-col gap-3 p-4 sm:p-8 text-gray-500 sm:text-[14px] text-[12px]"
      >
        <NormalInput
          type={"text"}
          label={"Author"}
          inputId={"author"}
          inputState={data?.author}
          setInputState={(val) => handleDataChange("author", val)}
        />
        <div className="flex flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
          <label htmlFor="img">Banner Image:</label>
          <input
            type="file"
            name="img"
            id="img"
            onChange={handleImgUpload}
            className="border border-gray-200 p-2 rounded-md outline-none flex-grow md:max-w-[70%]"
          />
        </div>
        <div
          className={`transition-all duration-500 overflow-hidden ${
            data?.img ? "max-h-[200px] min-h-[200px]" : "max-h-0 min-h-0"
          }`}
        >
          {data?.img !== null && data?.img !== undefined && (
            <div className="h-[200px] mx-auto">
              {/* {console.log(`${FILE_PATH}${data?.blogImg}`)} */}
              <img
                src={
                  view !== "edit"
                    ? URL.createObjectURL(data?.img)
                    : `${FILE_PATH}${data?.img}`
                }
                alt="Banner Image"
                className="w-full h-full object-contain"
                onLoad={() => console.log("LOADED")}
              />
            </div>
          )}
        </div>
        <TextareaInput
          rows={2}
          label={"Blog Title"}
          inputId={"title"}
          inputState={data?.title}
          setInputState={(val) => handleDataChange("title", val)}
        />
        <div className="flex flex-col">
          <label htmlFor="content">Blog content:</label>
          <div>
            <CKEditor
              editor={ClassicEditor}
              data={data?.content}
              config={editorConfig}
              //   onReady={(editor) => {
              //     // You can store the "editor" and use when it is needed.
              //     console.log('Editor is ready to use!', editor);
              //   }}
              onChange={(event, editor) => {
                const data = editor.getData();
                handleDataChange("content", data);
                // console.log({ event, editor, data });
              }}
              //   onBlur={(event, editor) => {
              //     console.log('Blur.', editor);
              //   }}
              //   onFocus={(event, editor) => {
              //     console.log('Focus.', editor);
              //   }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="p-2 mt-5 bg-tl_primary text border border-primary text-white font-bold hover:scale-105 rounded-md transition-all duration-300 flex-grow"
        >
          Save
        </button>
      </form>
    </Modal>
  );
}
