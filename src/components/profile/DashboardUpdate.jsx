import { useContext, useEffect, useState } from "react";
import { Button, message, Image, Upload } from "antd";
import { MainSiteContext } from "../../context/MainSiteContext";
import { FILE_PATH } from "../../utils/apiConfig";
import { UploadOutlined } from "@mui/icons-material";
import { UpdateProfile } from "../../methods/MainMethods";

const formItems = [
  {
    name: "englishScoreCard",
    file:"academicsDocuments",
    label: "ENGLISH PROFICIENCY SCORE CARD",
  },
  {
    name: "marksheet10th",
    file:"academicsDocuments",
    label: "10th Marksheet",
  },
  {
    name: "marksheet12th",
    file:"academicsDocuments",
    label: "12th Marksheet",
  },
  {
    name: "passport",
    file:"academicsDocuments",
    label: "PASSPORT FRONT & BACK",
  },
  {
    name: "marksheetUg",
    file:"academicsDocuments",
    label: "UG MARKSHEET Provisional or Degree",
  },
  {
    name: "marksheetPg",
    file:"academicsDocuments",
    label: "PG MARKSHEET",
  },
  {
    name: "statementOfPurpose",
    file:"academicsDocuments",
    label: "State of Purpose",
  },
  {
    name: "lor",
    file:"academicsDocuments",
    label: "Letter of Recommendation ",
  },
  {
    name: "resume",
    file:"academicsDocuments",
    label: "Resume/CV",
  },
  {
    name: "backlogCertificate",
    file:"academicsDocuments",
    label: "No Backlog Certificate",
  },
  {
    name: "additional",
    file:"academicsDocuments",
    label: "Additional Document",
  },
  {
    name: "offerletter",
    file:"experienceDocuments",
    label: "Offer Letter from Company",
  },

  {
    name: "salary",
    file:"experienceDocuments",
    label: "Last 3 Months Salary Slip",
  },
  {
    name: "IdentityProof",
    file:"loanDocuments",
    label: "Identity Proof",
  },
  {
    name: "bankStatement",
    file:"financialDocuments",
    label: "3 or 6 Months Bank Statement",
  },

  {
    name: "bankBalanceStatement",
    file:"financialDocuments",
    label: "Bank Balance Certificate",
  },

  {
    name: "educationLoanSectorLetter",
    file:"financialDocuments",
    label: "Education Loan Sector letter (if taken}",
  },

  {
    name: "sponsorshipLetter",
    file:"financialDocuments",
    label: "Sponsorship Letter",
  },

  {
    name: "tuitionFeePaidProof",
    file:"financialDocuments",
    label: "Tuition Fee paid proof",
  },

  {
    name: "additionalDocuments",
    file:"financialDocuments",
    label: "Additional Documents",
  },

  // Add more objects for other Form.Item components
];
function DashboardUpdate() {
  const [visible, setVisible] = useState([]);

  const [image,setImage]=useState([])
  const [showBtns, setShowBtns] = useState([]);

  const handleVisible = (index) => {
    setVisible(visible.map((item, ind) => (ind === index ? !item : item)));
  };
  const {
    state: { profile },
    dispatch,
  } = useContext(MainSiteContext);

  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const getName = (name) => formItems.find((item) => item.name === name);

 
  useEffect(()=>{
    if(profile?.updates?.length>0){
      setVisible(Array(profile?.updates?.length).fill(false))
      setImage(Array(profile?.updates?.length).fill(""))
      setShowBtns(Array(profile?.updates?.length).fill(false))
     
    }
  },[profile.updates])
  const handleBeforeUpload = (file,index) => {
    // Add the file to the fileList state
   setImage((prev)=>prev.map((item,i)=>i===index?file:item))
   setShowBtns((prev)=>prev.map((item,i)=>i===index?!item:item))

  };
  const handleUpload = (item, index) => {
    console.log(item)
    const fileToUpload = image[index];
    const doc =getName(item.name)
    const formData = new FormData();
    formData.append(item.name, fileToUpload);
    UpdateProfile(
      `user/profile/document/reupload/${doc?.file}/${item?._id}`,
      dispatch,
      formData,
      () => {}
    ).then(()=>{
      setShowBtns((prev) =>
        prev.map((item, ind) => (index === ind ? false : item))
      );
    });
  
  };
  console.log(image,visible)
 

  return (
    <div className="row">
      {profile.updates.length>0?profile?.updates?.map((item, index) => {
        return (
          <div className="col-12 col-lg-6 col-xl-4 mt-2">
            <div className=" card  p-2">
              <h6>{item.message}</h6>
              <h6 style={{ color: "#454545" }}>{getName(item.name)?.label}</h6>
              <div className="d-flex gap-2 mt-2">
              <div
                style={{ width: "fitContent" }}
                className="d-flex justify-content-center items-center "
              >
                {showBtns[index]&&<Button type="primary" onClick={() => handleVisible(index)}>
                  View
                </Button>}
                <Image
                  style={{
                    display: "none",
                  }}
                  src={
                    typeof image[index] === "object"
                      ? URL.createObjectURL(image[index])
                      : FILE_PATH + image[index]
                  }
                  preview={{
                    visible: visible[index],
                    src:
                      typeof image[index] === "object"
                        ? URL.createObjectURL(image[index])
                        : FILE_PATH + image[index],
                    onVisibleChange: (value) => handleVisible(index),
                  }}
                />
              </div>
            
            <Upload
              beforeUpload={(file) => handleBeforeUpload(file,index)}
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
                  onClick={() => handleUpload(item, index)}
                >
                  Submit
                </Button>
              </div>
            )}
              </div>
              </div>
            </div>
        );
      }):
      <div className="">
        No Updates
      </div>
      }
    </div>
  );
}

export default DashboardUpdate;
