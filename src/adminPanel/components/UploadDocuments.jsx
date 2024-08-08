import { Form, Upload, Button, Image, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FILE_PATH } from "../../utils/apiConfig";
import { useEffect, useState } from "react";
import { NormalInput } from "../../components/inputs/ModalInputs";
import { raiseDocsConcern } from "../methods/commonMethod";
import { toast } from "react-toastify";

const UploadDocuments = ({
  formItems,
  data,
  academics = false,
  fileName,
  handleDocs,
}) => {
  const [files, setFiles] = useState(formItems);
  const [showObjection, setShowObjection] = useState(false);
  const [viewObjections, setViewObjections] = useState(false);
  const [visible, setVisible] = useState(Array(formItems?.length).fill(false));
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });
  const handleChange = (name, val) => {
    if (!name) return;

    setFormData((prev) => ({ ...prev, [name]: val }));
  };
  const getFileName=(name)=>formItems.find((item)=>item.name===name)?.label;
  const [fileList, setFileList] = useState(() =>
    files?.reduce((acc, curr) => {
      acc[curr.name] = null;
      return acc;
    }, {})
  );
  const onFinish = (values) => {
    // Handle form submission here
    const formData = new FormData();
    Object.keys(fileList).forEach((item) =>
      formData.append(item, fileList[item])
    );
    handleDocs(
      formData,
      `admin/users/profile/docs-upload/${fileName}/${data?._id}`
    );
  };

  const [showBtns, setShowBtns] = useState(
    Array(formItems?.length).fill(false)
  );

  const handleVisible = (index) => {
    setVisible(visible.map((item, ind) => (ind === index ? !item : item)));
  };
  const handleBeforeUpload = (file, fileName) => {
    // Add the file to the fileList state

    setFileList((prevFileList) => ({
      ...prevFileList,
      [fileName]: file,
    }));
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // useEffect(() => {
  //   if (academics) {
  //     const levels = data?.education.map((ed) => ed.level);

  //     if ( levels && levels?.length > 0) {
  //       const filtered = formItems.filter((item) => {
  //         if (item.name.includes("marksheet")) {
  //           return levels?.some((level) =>
  //             item?.name?.includes(level?.toLowerCase())
  //           );
  //         }
  //         return true; // Include items that are not mark sheets
  //       });
  //       setFiles(filtered);
  //     }
  //   }

  // }, [fileList, academics, data]);

  const handleConcern = () => {
    if(formData?.message?.trim()==="")return 
    if(formData?.name?.trim()==="")return
    raiseDocsConcern(formData, `admin/users/documents/raise-concern/${data?._id}`).then(()=>{
      setShowObjection(false)
    }).catch(err=>toast.error("error adding concern"));
  };

  useEffect(() => {
    if (data?.documents && data?.documents[fileName]) {
      const { _id, ...item } = data?.documents[fileName];
      if (item) setFileList(item);
    }
  }, [data, files]);

  console.log(formData);
  return (
    <>
      <div className="border-2 border-zinc-100 rounded p-3">
        <div className="flex justify-between">

       
        <Button
          style={{ backgroundColor: "#5d0cfd" }}
          type="primary"
          htmlType="button"
          onClick={() => {
            setViewObjections (false)
            setShowObjection(!showObjection);
            
          }}
        >
          Raise Objection
        </Button>
        <Button
          style={{ backgroundColor: "#5d0cfd" }}
          type="primary"
          htmlType="button"
          onClick={() => {
            setShowObjection(false);
            setViewObjections(!viewObjections)
          }}
        >
         View Objections
        </Button>
        </div>

        {showObjection && (
          <>
            {" "}
            <div className="flex my-3 flex-col md:gap-3 md:items-center md:justify-between md:flex-row">
              <label htmlFor="payer"> Document:</label>
              <div className="flex-grow md:max-w-[70%]">
                <Select
                  size="large"
                  placeholder="Select Documents"
                  optionFilterProp="children"
                  value={formData?.name}
                  style={{ width: "100%" }}
                  onChange={(val) => handleChange("name", val)}
                  // onSearch={onSearch}
                  // filterOption={filterOption}
                  options={files.map((item) => ({
                    value: item.name,
                    label: item.label,
                  }))}
                />
              </div>
            </div>
            <NormalInput
              type={"text"}
              label={"Message"}
              inputId={"message"}
              inputState={formData?.message}
              setInputState={(val) => handleChange("message", val)}
            />
            <div className="my-3">
              <Button
                style={{ backgroundColor: "#5d0cfd" }}
                type="primary"
                htmlType="button"
                onClick={handleConcern}
              >
                Submit
              </Button>{" "}
            </div>
          </>
        )}
        {viewObjections && (
          <>
          <div className="my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data?.updates?.length>0&&
           data.updates.map((item)=>(
            <div className="border-2 border-zinc-200 rounded p-3">
              <div className="font-medium">{item.message}</div>
              <div className="underline">{getFileName(item.name)}</div>

            </div>

           ))}
          </div>
          </>
        )}
      </div>
      <Form
        // className=""
        name="upload-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {files.map((item, index) => (
          <Form.Item
            key={index}
            name={item.name}
            label={item.label}
            rules={item.rules}
            className="mt-2"
          >
            <div className="upload-div ms-auto">
              {fileList[item.name] && (
                <div
                  style={{ width: "fitContent" }}
                  className="d-flex justify-content-center items-center "
                >
                  <Button type="primary" onClick={() => handleVisible(index)}>
                    View
                  </Button>
                  <Image
                    style={{
                      display: "none",
                    }}
                    src={
                      typeof fileList[item.name] === "object"
                        ? URL.createObjectURL(fileList[item.name])
                        : FILE_PATH + fileList[item.name]
                    }
                    preview={{
                      visible: visible[index],
                      src:
                        typeof fileList[item.name] === "object"
                          ? URL.createObjectURL(fileList[item.name])
                          : FILE_PATH + fileList[item.name],
                      onVisibleChange: (value) => handleVisible(index),
                    }}
                  />
                </div>
              )}
              <Upload
                beforeUpload={(file) => handleBeforeUpload(file, item.name)}
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </div>
          </Form.Item>
        ))}
        <Form.Item className="d-flex justify-content-end">
          <Button
            style={{ backgroundColor: "#5d0cfd" }}
            type="primary"
            htmlType="button"
            onClick={onFinish}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UploadDocuments;
