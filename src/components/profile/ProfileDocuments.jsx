import React, { useContext, useEffect, useRef, useState } from "react";
import "./ProfileDocuments.css";
import { Form, Upload, Button, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Collapse, theme } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { UpdateProfile } from "../../methods/MainMethods";
import { MainSiteContext } from "../../context/MainSiteContext";
import { FILE_PATH } from "../../utils/apiConfig";

function ProfileDocuments() {
  const onFinish = (values) => {
    // Handle form submission here
    console.log("Received values:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const formItemLayout = {
    labelCol: {
      span: 24, // Full width for label
    },
    wrapperCol: {
      span: 24, // Full width for wrapper
    },
  };
  const { token } = theme.useToken();
  const panelStyle = {
    background: "#fff",
    borderRadius: token.borderRadiusLG,
    border: "none",
  };
  const getItems = (panelStyle) => [
    {
      key: "1",
      label: "Academics Documents",
      children: <AcademicDocuments />,
      style: panelStyle,
    },
    {
      key: "2",
      label: "Experience Documents",
      children: <ExperienceDocuments />,
      style: panelStyle,
    },
    {
      key: "3",
      label: "Loan Documents",
      children: <LoanDocuments />,
      style: panelStyle,
    },
    {
      key: "4",
      label: "Financial Documents",
      children: <FinancialDocuments />,
      style: panelStyle,
    },
  ];

  return (
    <>
      {getItems(panelStyle).map((item, index) => {
        return (
          <div>
            <Collapse
              className="container-xl mt-3"
              bordered={false}
              style={{ padding: "0" }}
              defaultActiveKey={index === 0 ? [item.key] : []}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              items={getItems(panelStyle).filter((it) => it.key === item.key)}
            />
          </div>
        );
      })}
    </>
  );
}

export const AcademicDocuments = () => {
  const {
    state: { profile },
    dispatch,
  } = useContext(MainSiteContext);
  const imageRefs = useRef({});

  const formItems = [
    {
      name: "englishScoreCard",
      label: "ENGLISH PROFICIENCY SCORE CARD",
      rules: [
        {
          required: true,
          message: "PLEASE UPLOAD THE ENGLISH PROFICIENCY SCORE CARD",
        },
      ],
      uploadAction: "https://calmvapidarchitects--ankur73tiwari.repl.co/upload",
    },
    {
      name: "marksheet10th",
      label: "10th Marksheet",
      rules: [
        {
          required: true,
          message: "PLEASE UPLOAD the 10th marksheet",
        },
      ],
      uploadAction:
        "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    },
    {
      name: "marksheet12th",
      label: "12th Marksheet",
      rules: [
        {
          required: true,
          message: "PLEASE UPLOAD the 12th marksheet",
        },
      ],
    },
    {
      name: "passport",
      label: "PASSPORT FRONT & BACK",
      rules: [
        {
          required: true,
          message: "PLEASE UPLOAD PASSPORT FRONT & BACK",
        },
      ],
    },
    {
      name: "marksheetUg",
      label: "UG MARKSHEET Provisional or Degree",
      rules: [
        {
          required: true,
          message: "PLEASE UPLOAD UG MARKSHEET",
        },
      ],
    },
    {
      name: "marksheetPg",
      label: "PG MARKSHEET",
      rules: [
        {
          required: true,
          message: "PLEASE UPLOAD PG MARKSHEET",
        },
      ],
    },
    {
      name: "statementOfPurpose",
      label: "State of Purpose",
      rules: [
        {
          required: true,
          message: "PLEASE UPLOAD PG MARKSHEET",
        },
      ],
    },
    {
      name: "lor",
      label: "Letter of Recommendation ",
      rules: [
        {
          required: true,
          message: "PLEASE UPLOAD letter of recommendation",
        },
      ],
    },
    {
      name: "resume",
      label: "Resume/CV",
      rules: [
        {
          required: true,
          message: "PLEASE UPLOAD resume or CV",
        },
      ],
    },
    {
      name: "backlogCertificate",
      label: "No Backlog Certificate",
      rules: [
        {
          message: "PLEASE UPLOAD No Backlog Certificate",
        },
      ],
    },
    {
      name: "additional",
      label: "Additional Document",
      rules: [
        {
          message: "PLEASE UPLOAD Any addtional documents",
        },
      ],
    },
    // Add more objects for other Form.Item components
  ];

  // Then use formItemsJSX wherever you want to render the Form.Item components dynamically

  const { education } = profile;
  const onFinish = (values) => {
    // Handle form submission here
    console.log("Received values:", values);
  };
  const [visible, setVisible] = useState(Array(formItems.length).fill(false));

  const [showBtns, setShowBtns] = useState(Array(formItems.length).fill(false));
  const [fileList, setFileList] = useState(() =>
    formItems.reduce((acc, curr) => {
      acc[curr.name] = null;
      return acc;
    }, {})
  );

  const handleBeforeUpload = (file, ind, fileName) => {
    // Add the file to the fileList state
    console.log(file);
    setShowBtns((prev) =>
      prev.map((item, index) => (index === ind ? true : false))
    );

    setFileList((prevFileList) => ({
      ...prevFileList,
      [fileName]: file,
    }));

    // Return false to prevent automatic upload by Ant Design
    return false;
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const formItemLayout = {
    labelCol: {
      span: 24, // Full width for label
    },
    wrapperCol: {
      span: 24, // Full width for wrapper
    },
  };

  const handleUpload = (name, index) => {
    const fileToUpload = fileList[name];

    const formData = new FormData();
    formData.append(name, fileToUpload);
    UpdateProfile(
      "user/profile/docs-upload/academicsDocuments",
      dispatch,
      formData,
      () => {}
    );
    setShowBtns((prev) =>
      prev.map((item, ind) => (index === ind ? false : item))
    );
  };
  console.log(fileList);
  const handleVisible = (index) => {
    setVisible(visible.map((item, ind) => (ind === index ? !item : item)));
  };
  useEffect(() => {
    if (profile?.documents?.academicsDocuments) {
      const { _id, ...item } = profile?.documents?.academicsDocuments;
      if (item) setFileList(item);
    }
  }, [profile]);
  console.log(visible);
  return (
    <>
      {!education.some((elem) => elem.level == "ug")
        ? formItems
            .filter(
              (elem) =>
                elem.name !== "marksheetUg" && elem.name !== "marksheetPg"
            )
            .map((item, index) => {
              return (
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
                        <Button
                          type="primary"
                          onClick={() => handleVisible(index)}
                        >
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
                      beforeUpload={(file) =>
                        handleBeforeUpload(file, index, item.name)
                      }
                      listType="picture"
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>

                    {showBtns[index] === true && (
                      <div className="d-flex justify-content-end">
                        <Button
                          style={{ backgroundColor: "#5d0cfd" }}
                          type="primary"
                          htmlType="button"
                          onClick={() => handleUpload(item.name, index)}
                        >
                          Submit
                        </Button>
                      </div>
                    )}
                  </div>
                </Form.Item>
              );
            })
        : formItems.map((item, index) => {
            return (
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
                      <Button
                        type="primary"
                        onClick={() => handleVisible(index)}
                      >
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
                    beforeUpload={(file) =>
                      handleBeforeUpload(file, index, item.name)
                    }
                    listType="picture"
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>

                  {showBtns[index] === true && (
                    <div className="d-flex justify-content-end">
                      <Button
                        style={{ backgroundColor: "#5d0cfd" }}
                        type="primary"
                        htmlType="button"
                        onClick={() => handleUpload(item.name, index)}
                      >
                        Submit
                      </Button>
                    </div>
                  )}
                </div>
              </Form.Item>
            );
          })}
    </>
  );
};
export const ExperienceDocuments = () => {
  const ExperienceItems = [
    {
      name: "offerletter",
      className: "mt-2",
      label: "Offer Letter from Company",
      rules: [
        {
          required: true,
          message: "PLEASE UPLOAD THE OFFER LETTER FROM COMPANY",
        },
      ],
    },

    {
      name: "salary",
      label: "Last 3 Months Salary Slip",
      rules: [
        {
          required: true,
          message: "PLEASE UPLOAD the salary slip of last 3 months",
        },
      ],
    },
  ];
  const {
    state: { profile },
    dispatch,
  } = useContext(MainSiteContext);
  const [visible, setVisible] = useState(
    Array(ExperienceItems.length).fill(false)
  );

  const [fileList, setFileList] = useState(() =>
    ExperienceItems.reduce((acc, curr) => {
      acc[curr.name] = null;
      return acc;
    }, {})
  );
  const onFinish = (values) => {
    // Handle form submission here
    console.log(fileList);
    const formData = new FormData();
    Object.keys(fileList).forEach((item) =>
      formData.append(item, fileList[item])
    );

    UpdateProfile(
      "user/profile/docs-upload/experienceDocuments",
      dispatch,
      formData,
      () => {}
    );
  };
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

  const formItemLayout = {
    labelCol: {
      span: 24, // Full width for label
    },
    wrapperCol: {
      span: 24, // Full width for wrapper
    },
  };
  useEffect(() => {
    if (profile?.documents?.experienceDocuments) {
      const { _id, ...item } = profile?.documents?.experienceDocuments;
      if (item) setFileList(item);
    }
  }, [profile]);
  console.log(fileList);

  return (
    <Form
      // className=""
      name="upload-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {ExperienceItems.map((item, index) => (
        <Form.Item
          index={index}
          name={item.name}
          className="mt-2"
          label={item.label}
          rules={item.rules}
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
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export const LoanDocuments = () => {
  const loanItems = [
    {
      name: "IdentityProof",
      className: "mt-2",
      label: "Identity Proof",
      rules: [
        {
          required: true,
          message: "PLEASE UPLOAD ANY IDENTITY PROOF YOU HAVE",
        },
      ],
    },
  ];

  const {
    state: { profile },
    dispatch,
  } = useContext(MainSiteContext);
  const [visible, setVisible] = useState(Array(loanItems.length).fill(false));

  const [fileList, setFileList] = useState(() =>
    loanItems.reduce((acc, curr) => {
      acc[curr.name] = null;
      return acc;
    }, {})
  );
  const onFinish = (values) => {
    // Handle form submission here
    console.log(fileList);
    const formData = new FormData();
    Object.keys(fileList).forEach((item) =>
      formData.append(item, fileList[item])
    );

    UpdateProfile(
      "user/profile/docs-upload/loanDocuments",
      dispatch,
      formData,
      () => {}
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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

  const formItemLayout = {
    labelCol: {
      span: 24, // Full width for label
    },
    wrapperCol: {
      span: 24, // Full width for wrapper
    },
  };
  useEffect(() => {
    if (profile?.documents?.loanDocuments) {
      const { _id, ...item } = profile?.documents?.loanDocuments;
      if (item) setFileList(item);
    }
  }, [profile]);
  return (
    <Form
      // className=""
      name="upload-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {loanItems.map((item, index) => (
        <Form.Item
          index={index}
          name={item.name}
          className="mt-2"
          label={item.label}
          rules={item.rules}
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
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export const FinancialDocuments = () => {
  const financialItems = [
    {
      name: "bankStatement",
      label: "3 or 6 Months Bank Statement",
      rules: [
        {
          required: true,
          message: "PLEASE UPLOAD 3 or 6 months Bank Statement",
        },
      ],
    },

    {
      name: "bankBalanceStatement",
      label: "Bank Balance Certificate",
      rules: [
        {
          required: true,
          message: "PLEASE UPLOAD Bank Balance Certificate",
        },
      ],
    },

    {
      name: "educationLoanSectorLetter",
      label: "Education Loan Sector letter (if taken}",
      rules: [{ message: "Please Enter Education Loan Sector letter" }],
    },

    {
      name: "sponsorshipLetter",
      label: "Sponsorship Letter",
      rules: [{ message: "Please Enter Sponsorship Letter " }],
    },

    {
      name: "tuitionFeePaidProof",
      label: "Tuition Fee paid proof",
      rules: [{ message: "Please Enter Tuition Fee paid proof" }],
    },

    {
      name: "additionalDocuments",
      label: "Additional Documents",

      rules: [{ message: "Please Enter Additional Documents" }],
    },
  ];

  const {
    state: { profile },
    dispatch,
  } = useContext(MainSiteContext);
  const [visible, setVisible] = useState(
    Array(financialItems.length).fill(false)
  );

  const [fileList, setFileList] = useState(() =>
    financialItems.reduce((acc, curr) => {
      acc[curr.name] = null;
      return acc;
    }, {})
  );
  const onFinish = (values) => {
    // Handle form submission here
    console.log(fileList);
    const formData = new FormData();
    Object.keys(fileList).forEach((item) =>
      formData.append(item, fileList[item])
    );

    UpdateProfile(
      "user/profile/docs-upload/financialDocuments",
      dispatch,
      formData,
      () => {}
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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

  const formItemLayout = {
    labelCol: {
      span: 24, // Full width for label
    },
    wrapperCol: {
      span: 24, // Full width for wrapper
    },
  };
  console.log(fileList);
  useEffect(() => {
    if (profile?.documents?.financialDocuments) {
      const { _id, ...item } = profile?.documents?.financialDocuments;
      if (item) setFileList(item);
    }
  }, [profile]);
  return (
    <Form
      // className=""
      name="upload-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {financialItems.map((item, index) => (
        <Form.Item
          name={item.name}
          className="mt-2"
          label={item.label}
          rules={item.rules}
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
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileDocuments;
