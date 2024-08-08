const xlsx = require("xlsx");
const path = require("path");
const filename = "zipfile-final/.xlsx";
const filePath = path.join(__dirname, `../data/${filename}`);

const convertDataToModel = (row) => {
  // console.log(row);
  if (Object.keys(row).length > 1) {
    // console.log(Object.keys(row));
    const fields = Object.keys(row);
    const bankName = row[fields[0]];
    const interestRate = row[fields[1]];
    const processingFee = row[fields[2]];
    const aptitudeExams = row[fields[3]];
    const academicScore = row[fields[4]];
    const englishScore = row[fields[5]];
    const salary = row[fields[6]];
    const cibilScore = row[fields[7]];
    const univerSityWorldRank = row[fields[8]];
    const withCollateral = row[fields[9]];
    // const withoutCollateralVal = row[fields[10]];
    let subjectsAndRanges = {};
    let subjectAndRange = [];
    let subjectAndMarks = [];
    let salaryData = "";
    let cibilData = "";
    let rankData = "";
    let collateralData;
    // const withoutCollateralData = {
    //   eligible: "",
    //   minAmount: "",
    // };
    // console.log(interestRate, "INTEREST");
    const [interestFrom, interestTo] =
      interestRate !== undefined
        ? interestRate?.split(" to ").map(parseFloat)
        : "";
    // Input string
    const str = processingFee;

    // Regular expression pattern to match the percentage value
    const regex = /(\d+(\.\d+)?)%/g || /(\d)%/;

    // Match the percentage value
    let match = str?.includes("%") && str?.match(regex);
    let processingFeePercent = "";
    // Extract the percentage value from the matched result
    if (match) {
      if (str?.includes(" to ")) {
        // console.log(match);
        const [processingFeeFrom, processingFeeTo] = match;
        // console.log(match[1])
        processingFeePercent = {
          type: "percentage",
          from: parseFloat(processingFeeFrom?.replace("%", "")),
          to: parseFloat(processingFeeTo?.replace("%", "")),
        };
      } else {
        processingFeePercent = {
          type: "percentage",
          from: 0,
          to: parseFloat(match[0]),
          withGST: false,
        };
      }
    } else if (str?.includes("INR")) {
      const [processingFeeINR] = str.split(" INR");
      processingFeePercent = {
        type: "number",
        from: parseFloat(processingFeeINR.replace(",", "")),
        to: 0,
        withGST: false,
      };
    } else if (str?.includes("plus") && str?.includes("GST")) {
      const [processingFeeINR, isGST] = str.split(" plus ");
      const hasGST = isGST == "GST" ? true : false;
      console.log(str, processingFeeINR, hasGST);
      processingFeePercent = {
        type: "number",
        from: parseFloat(processingFeeINR.replace(",", "")),
        to: 0,
        withGST: hasGST,
      };
    }

    // Input string
    //   {
    //     const str = aptitudeExams;

    //     // Regular expression pattern to match subjects and marks ranges

    //     const regex = /([A-Z]+)\s+(\d+)\s+to\s+(\d+)/gi;

    //     // Initialize an empty object to store subjects and marks ranges
    //     if (str == "Not Given") {
    //       subjectsAndRanges = [];
    //     }
    //     // Match subjects and marks ranges using regular expression
    //     else {
    //       let match;
    //       while ((match = regex.exec(str)) !== null) {
    //         // console.log(match)
    //         // Extract subject and marks range from the matched result
    //         const subject = match[1];
    //         const minMarks = parseInt(match[2]);
    //         const maxMarks = parseInt(match[3]);

    //         // Assign marks range to corresponding subject in the object
    //         subjectsAndRanges[subject] = {
    //           subject: subject,
    //           min: minMarks,
    //           max: maxMarks,
    //         };
    //       }
    //     }
    //     // console.log(subjectsAndRanges,'SUBJECT')
    //   }
    //   {
    //     const str = academicScore;
    //     const regex = /(\d+)(%),\s(\d+).(\d+),\s+to+\s(\d+)(%),\s(\d+)(.)(\d+)/g;
    //     let match;
    //     while ((match = regex.exec(str)) !== null) {
    //       const subject = match[1];
    //       const from = { percent: parseInt(match[1]), cgpa: parseInt(match[3]) };
    //       const to = { percent: parseInt(match[5]), cgpa: parseInt(match[7]) };

    //       subjectAndRange = {
    //         from: from,
    //         to: to,
    //       };
    //     }
    //     console.log(subjectAndRange);
    //   }
    //   {
    //     const academic = englishScore;
    //     const regex =
    //       /([A-Z]+)\s(\d)\s+to+\s(\d+(\.(\d))),\s([A-Z]+)\s(\d+)\s+to+\s(\d+),\s([A-Z]+)\s(\d+)\s+to+\s(\d+)/g;

    //     let match;
    //     while ((match = regex.exec(academic)) !== null) {
    //       // const subject = match[1];
    //       subjectAndMarks.push(
    //         { subject: match[1], from: match[2], to: match[3] },
    //         { subject: match[6], from: match[7], to: match[8] },
    //         { subject: match[9], from: match[10], to: match[11] }
    //       );
    //     }
    //   }
    //   {
    //     const str = salary;
    //     const regex =
    //       /(\d{1,3}(,\d{3})*)(\.\d+)?\s+to\s+(\d{1,3}(,\d{3})*)(\.\d+)?/g;

    //     let match;
    //     while ((match = regex.exec(str)) !== null) {
    //       salaryData = {
    //         from: Number(match[1].replace(",", "")),
    //         to: Number(match[4].replace(",", "")),
    //       };
    //     }
    //     // console.log(salaryData);
    //   }
    //   {
    //     const cibil = cibilScore;
    //     const regex = /(\d{1,3})\s+to+\s(\d{1,3})/g;

    //     while ((match = regex.exec(cibil)) !== null) {
    //       cibilData = {
    //         from: Number(match[1]),
    //         to: Number(match[2]),
    //       };
    //     }
    //     // console.log(cibilData);
    //   }
    //   {
    //     const rank = univerSityWorldRank;
    //     const regex = /(\d{1,3})\s+to+\s(\d{1,3})/g;

    //     while ((match = regex.exec(rank)) !== null) {
    //       rankData = {
    //         from: Number(match[1]),
    //         to: Number(match[2]),
    //       };
    //     }
    //     // console.log(rankData);
    //   }
    //   {
    //     const collateralVal = withCollateral; // Example input
    //     const regex = collateralVal.includes(".")
    //       ? /Above\s+(\d+\.\d+)/g
    //       : /Above\s+(\d+)/g;

    //     let match;
    //     while ((match = regex.exec(collateralVal)) !== null) {
    //       collateralData = {
    //         eligible: collateralVal,
    //         minAmount: parseFloat(match[1]),
    //       };
    //     }
    //     // console.log(collateralData, "DATA");
    //   }
    // {
    //   const withoutCollateral = withoutCollateralVal;

    //   withoutCollateral.includes("Not")
    //     ? ((withoutCollateralData.eligible = false),
    //       (withoutCollateralData.minAmount = 0))
    //     : ((withoutCollateralData.eligible = true),
    //       (withoutCollateralData.minAmount = 0));
    // }
    return {
      // bankName: bankName,
      // expectedInterestRate: {
      //   from: interestFrom,
      //   to: interestTo,
      // },
      processingFee: processingFeePercent,
      // aptitudeExams: subjectsAndRanges,
      // academicScore: subjectAndRange,
      // englishProficiencyScore: subjectAndMarks,
      // salary: salaryData,
      // cibilScore: cibilData,
      // univerSityWorldRank: rankData,
      // withCollateral: collateralData,
      // withoutCollateral: withoutCollateralData ? withoutCollateralData : fa,
    };
  } else {
    return false;
  }
};

const updateLoanData = (req, res, next) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetNames = workbook.SheetNames;
    // console.log(sheetNames)
    let data = [];

    sheetNames.forEach((sheetName, index) => {
      // console.log(index,sheetNames.length)
      const worksheet = workbook.Sheets[sheetName];
      let sheetData = xlsx.utils.sheet_to_json(worksheet);
      const convertedData = sheetData.map((row) => convertDataToModel(row));
      data = data.concat(convertedData);
    });
    req.body.items = data;
    next();
  } catch (err) {
    console.error("Error reading file:", err);
    res.status(500).json({ error: "Error reading file" });
  }
};

module.exports = updateLoanData;
