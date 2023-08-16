import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8083/admin/dashboard", {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res.data);
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: "true",
          closeOnClick: true,
          pauseOnHover: false,
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          toast.error(error.response.data.error, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: "true",
            closeOnClick: true,
            pauseOnHover: false,
          });
          navigate("/signin");
        } else {
          console.error("Error:", error);
        }
      });
  }, [navigate]);

  const downloadExcel = async () => {
    try {
      const response = await axios.get("http://localhost:8083/data/get");
      const data = response.data.data;

      if (!Array.isArray(data)) {
        throw new Error(
          "Data is not in the expected format (array of objects)"
        );
      }

      // Exclude properties 'id' and '_v' from each object
      const cleanedData = data.map(({ _id, __v, ...rest }) => rest);

      const worksheet = XLSX.utils.json_to_sheet(cleanedData, {
        header: Object.keys(cleanedData[0]),
      });

      // Apply style to header row (A1, B1, C1, etc.)
      const headerCellStyle = { fill: { fgColor: { rgb: "FFFF00" } } };
      const headerRange = XLSX.utils.decode_range(worksheet["!ref"]);
      for (let i = headerRange.s.r; i <= headerRange.e.r; i++) {
        const cellAddress = XLSX.utils.encode_cell({ r: i, c: 0 });
        if (worksheet[cellAddress]) {
          worksheet[cellAddress].s = headerCellStyle;
        }
      }

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "DataSheet");

      XLSX.writeFile(workbook, "data.xlsx");
    } catch (error) {
      console.error("Error downloading Excel:", error);
    }
  };

  const logOut = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2>Admin</h2>
      <button onClick={downloadExcel} className="btn btn-primary">
        Download in Excel
      </button>
      <button onClick={logOut} className="btn btn-danger m-3">
        Log out
      </button>
      {/* <button onClick={viewExcel} className="btn btn-secondary m-3">View in Excel</button> */}
    </div>
  );
};

export default Admin;
