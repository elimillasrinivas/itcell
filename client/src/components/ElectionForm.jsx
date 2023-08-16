import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ps from "../assets/ps.png";
import Navbar from "./Navbar";

const ElectionForm = () => {
  const [formData, setFormData] = useState({
    district: "",
    revenueMandal: "",
    returningOfficer: "",
    latitude: "",
    longitude: "",
    totalVoters: 0,
    numberOfPollingStationsForFemales: 0,
    numberOfPollingStationsForTransgenders: 0,
    numberOfPollingStationsForMales: 0,
    pollingStationPhoto: "",
    acnumber: 0,
    assembly: "",
    policeStation: "",
    pollingRoute: 0,
    policeStationNumber: 0,
    pollingStationName: "",
    pollingStationNumber: 0,
    evmStrongRoomLocation: "",
    evmDistributionPointLocation: "",
    categoryOfLocation: "",
    strikingForceIC: "",
    revenueSectorIC: "",
    policeRouteIC: "",
    localPoliceIC: "",
    shophn: 0,
    icACPphn: 0,
    icDCPphn: 0,
    qrtIC: "",
  });

  const [districts, setDistricts] = useState([]);
  const [mandals, setMandals] = useState([]);
  const [assemblies, setAssemblies] = useState([]);
  const [policeStations, setPoliceStations] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedAssembly, setSelectedAssembly] = useState("");
  const [selectedRevenueMandal, setSelectedRevenueMandal] = useState("");
  const [selectedPoliceStation, setSelectedPoliceStation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [image, setImage] = useState("");
  const uploadImagetodata = () => {
    // console.log(image);
    if (image) {
      uploadImagetoCloudinary(image).then((res) => {
        // console.log(res);
        setImage(res);
      });
    }
  };
  const uploadImagetoCloudinary = async (val) => {
    // console.log(val);
    const data = new FormData();
    data.append("file", val);
    data.append("upload_preset", "srinivas");
    return axios
      .post(
        "https://api.cloudinary.com/v1_1/srinivaselimilla/image/upload",
        data
      )
      .then((res) => {
        return res.data.url;
      });
  };

  const fetchDistricts = async () => {
    const response = await axios.get("http://localhost:8083/api/districts");
    // console.log(response.data);
    setDistricts(response.data);
  };

  const fetchMandals = async (assemblyId) => {
    const response = await axios.get(
      `http://localhost:8083/api/mandals/${assemblyId}`
    );
    // console.log(response.data);
    setMandals(response.data);
  };

  const fetchAssemblies = async (districtId) => {
    const response = await axios.get(
      `http://localhost:8083/api/assemblies/${districtId}`
    );
    console.log(response.data);
    setAssemblies(response.data);
  };

  const fetchPoliceStations = async (districtId, assemblyId) => {
    const response = await axios.get(
      `http://localhost:8083/api/police-stations/${districtId}/${assemblyId}`
    );
    // console.log(response.data);
    setPoliceStations(response.data);
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  const handleDistrictChange = (e) => {
    const selectedDistrictName = e.target.options[e.target.value].textContent;
    // console.log(e.target.options[e.target.value].textContent);
    const selectedDistrictId = e.target.value;
    setSelectedDistrict(selectedDistrictName);
    fetchMandals(selectedDistrictId);
    fetchAssemblies(selectedDistrictId);
    setPoliceStations([]);
  };

  const handleMandalChange = (e) => {
    const selectedDistrictId = document.getElementById("district").value;
    const selectedMandalId = e.target.value;
    const selectedMandalName = e.target.options[e.target.value].textContent;
    setSelectedRevenueMandal(selectedMandalName);
    fetchPoliceStations(selectedDistrictId, selectedMandalId);
  };

  const handleAssemblyChange = (e) => {
    const selectedAssemblyName = e.target.options[e.target.value].textContent;
    setSelectedAssembly(selectedAssemblyName);
  };

  const handlePoliceStationChange = (e) => {
    const selectedPoliceStationName =
      e.target.options[e.target.value].textContent;
    setSelectedPoliceStation(selectedPoliceStationName);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      pollingStationPhoto: image,
      district: selectedDistrict,
      assembly: selectedAssembly,
      revenueMandal: selectedRevenueMandal,
      policeStation: selectedPoliceStation,
      categoryOfLocation: selectedCategory,
    };
    console.log(updatedFormData);
    await axios
      .post("http://localhost:8083/data/entry", updatedFormData)
      .then((res) => {toast.success(res.data.message,{
        position:"top-center",
        autoClose:2000,
        hideProgressBar:"true",
        closeOnClick: true,
        pauseOnHover: false,
      })   } );
  };

  const cancelHandler = () => {
    setFormData({
      district: "",
      revenueMandal: "",
      returningOfficer: "",
      latitude: "",
      longitude: "",
      totalVoters: 0,
      numberOfPollingStationsForFemales: 0,
      numberOfPollingStationsForTransgenders: 0,
      numberOfPollingStationsForMales: 0,
      pollingStationPhoto: "",
      acnumber: 0,
      assembly: "",
      policeStation: "",
      distributionRoute: 0,
      policeStationNumber: 0,
      pollingStationName: "",
      pollingStationNumber: 0,
      evmStrongRoomLocation: "",
      evmDistributionPointLocation: "",
      categoryOfLocation: "",
      strikingForceIC: "",
      revenueSectorIC: "",
      policeRouteIC: "",
      localPoliceIC: "",
      shophn: 0,
      icACPphn: 0,
      icDCPphn: 0,
      qrtIC: "",
    });

    setSelectedDistrict("");
    setSelectedAssembly("");
    setSelectedRevenueMandal("");
    setSelectedPoliceStation("");
    setSelectedCategory("");
    setImage("");
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      {/* <div className="m-5 eaform">
      <h2>Election Application Data Entry Form</h2>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="district">
                Name of the Dist. <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="district"
                className="form-control"
                onChange={handleDistrictChange}
              >
                <option value="">Select a District</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
              <p style={{ color: "lightgray" }}>
                This field is Revenue District
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="revenueMandal">
                Revenue Mandal <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="mandalSelect"
                className="form-control"
                onChange={handleMandalChange}
              >
                <option value="">Select a Mandal</option>
                {mandals.map((mandal) => (
                  <option key={mandal.id} value={mandal.id}>
                    {mandal.name}
                  </option>
                ))}
              </select>
              <p style={{ color: "lightgray" }}>
                List of mandals under selected district
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="latitude">
                Returning Authority <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="returningOfficer"
                name="returningOfficer"
                value={formData.returningOfficer}
                onChange={handleChange}
              />
              <p style={{ color: "lightgray" }}>
                Please eneter returning officer
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="latitude">
                Latitude <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
              />
              <p style={{ color: "lightgray" }}>Please eneter exact latitude</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="assembly">
                AC <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="assembly"
                className="form-control"
                onChange={handleAssemblyChange}
                name="assembly"
              >
                <option value="">Select an Assembly</option>
                {assemblies.map((assembly) => (
                  <option key={assembly.id} value={assembly.id}>
                    {assembly.name}
                  </option>
                ))}
              </select>
              <p style={{ color: "lightgray" }}>
                Eneter poling station comes under your police station
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="acnumber">
                AC Number
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="acnumber"
                name="acnumber"
                value={formData.acnumber}
                onChange={handleChange}
              />
              <p style={{ color: "lightgray" }}>
                Enter assembly constituency number
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="totalVoters">
                Total Voters
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="totalVoters"
                name="totalVoters"
                value={formData.totalVoters}
                onChange={handleChange}
              />
              <p style={{ color: "lightgray" }}>
                Polling Stations belong Females
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="numberOfPollingStationsForFemales">
                Number of Polling Stations for Females
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="numberOfPollingStationsForFemales"
                name="numberOfPollingStationsForFemales"
                value={formData.numberOfPollingStationsForFemales}
                onChange={handleChange}
              />
              <p style={{ color: "lightgray" }}>
                Polling Stations belong Females
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="numberOfPollingStationsForTransgenders">
                Number of Polling Stations for Transgenders{" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="numberOfPollingStationsForTransgenders"
                name="numberOfPollingStationsForTransgenders"
                value={formData.numberOfPollingStationsForTransgenders}
                onChange={handleChange}
              />
              <p style={{ color: "lightgray" }}>
                Polling Stations belong to Transgenders
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="policeStation">
                Police Station <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="policeStationSelect"
                className="form-control"
                onChange={handlePoliceStationChange}
              >
                <option value="">Select a Police Station</option>
                {policeStations.map((ps) => (
                  <option key={ps.id} value={ps.id}>
                    {ps.name}
                  </option>
                ))}
              </select>
              <p style={{ color: "lightgray" }}>Select your police station</p>
            </div>

            <div className="form-group">
              <label htmlFor="policeStationNumber">
                Police Station  Number
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="policeStationNumber"
                name="policeStationNumber"
                value={formData.policeStationNumber}
                onChange={handleChange}
              />
              <p style={{ color: "lightgray" }}>Enter poling station number</p>
            </div>

            <div className="form-group">
              <label htmlFor="polingStationPhoto">
                Polling Station Photo <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="file"
                className="form-control"
                id="polingStationPhoto"
                name="polingStationPhoto"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  // console.log(image);
                }}
                onBlur={uploadImagetodata}
              />
              <p style={{ color: "lightgray" }}>Refer below image</p>

              <img src={ps} alt="referImage" width={400} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="longitude">
                Longitude <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
              />
            </div>
            <p style={{ color: "lightgray" }}>Please eneter exact longitude</p>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="numberOfPolingStationsForMales">
                Number of Polling Stations for Males
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="numberOfPollingStationsForMales"
                name="numberOfPollingStationsForMales"
                value={formData.numberOfPollingStationsForMales}
                onChange={handleChange}
              />
              <p style={{ color: "lightgray" }}>
                Polling Stations belong to Males
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="polingStationName">
                Polling Station Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="pollingStationName"
                name="pollingStationName"
                value={formData.pollingStationName}
                onChange={handleChange}
              />
              <p style={{ color: "lightgray" }}>
                Enter police station location name
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="pollingStationNumber">
                Polling Station Number <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="pollingStationNumber"
                name="pollingStationNumber"
                value={formData.polingStationNumber}
                onChange={handleChange}
              />
              <p style={{ color: "lightgray" }}>
                Enter polling station location number
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="pollingroute">
                Polling Route No. <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="pollingroute"
                name="pollingroute"
                value={formData.pollingroute}
                onChange={handleChange}
              />
              <p style={{ color: "lightgray" }}>
                Enter exact distribution route
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="evmStrongRoomLocation">
                EVM Strong Room Location <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="evmStrongRoomLocation"
                name="evmStrongRoomLocation"
                value={formData.evmStrongRoomLocation}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="evmDistributionPointLocation">
                EVM Distribution Point Location{" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="evmDistributionPointLocation"
                name="evmDistributionPointLocation"
                value={formData.evmDistributionPointLocation}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="categoryOfLocation">
                Location Category
                <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="categoryOfLocation"
                className="form-control"
                onChange={handleCategoryChange}
                name="categoryOfLocation"
              >
                <option value="">Select an Category</option>
                <option value="Normal">Normal</option>
                <option value="Critical">Critical</option>
              </select>
              <p style={{ color: "lightgray" }}>
                Select normal or critical
              </p>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="strikingForceIC">
                Striking Force I/C <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="strikingForceIC"
                name="strikingForceIC"
                value={formData.strikingForceIC}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="revenueSectorIC">
                Revenue Sector I/C <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="revenueSectorIC"
                name="revenueSectorIC"
                value={formData.revenueSectorIC}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="policeRouteIC">
                Police Route I/C <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="policeRouteIC"
                name="policeRouteIC"
                value={formData.policeRouteIC}
                onChange={handleChange}
              />
            </div>
            <p style={{ color: "lightgray" }}>
                Enter exact police route
              </p>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="localPoliceIC">
                Local(police) I/C <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="localPoliceIC"
                name="localPoliceIC"
                value={formData.localPoliceIC}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="shophn">
                SHO Ph.no <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="shophn"
                name="shophn"
                value={formData.shophn}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="icACPphn">
                I/C ACP Ph.no <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="icACPphn"
                name="icACPphn"
                value={formData.icACPphn}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="icDCPphn">
                I/C DCP Ph.no <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="icDCPphn"
                name="icDCPphn"
                value={formData.icDCPphn}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="qrtIC">
                QRT I/C <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="qrtIC"
                name="qrtIC"
                value={formData.qrtIC}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button type="button" className="btn btn-secondary m-3" onClick={cancelHandler}>
          Cancel
        </button>
        <button type="button" className="btn btn-danger" onClick={handleRefresh}>
        Refresh
       </button>
      </form>
    </div> */}

      <div className="m-5 eaform">
        <h2>Election Application Data Entry Form</h2>
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="district">
                  Name of the Dist. <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="district"
                  className="form-control"
                  onChange={handleDistrictChange}
                  required
                >
                  <option value="">Select a District</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
                <p style={{ color: "lightgray" }}>
                  This field is Revenue District
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="assembly">
                  AC <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="assembly"
                  className="form-control"
                  onChange={handleAssemblyChange}
                  name="assembly"
                  required
                >
                  <option value="">Select an Assembly</option>
                  {assemblies.map((assembly) => (
                    <option key={assembly.id} value={assembly.id}>
                      {assembly.name}
                    </option>
                  ))}
                </select>
                <p style={{ color: "lightgray" }}>
                  Enter poling station comes under your police station
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="revenueMandal">
                  Revenue Mandal <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="mandalSelect"
                  className="form-control"
                  onChange={handleMandalChange}
                  required
                >
                  <option value="">Select a Mandal</option>
                  {mandals.map((mandal) => (
                    <option key={mandal.id} value={mandal.id}>
                      {mandal.name}
                    </option>
                  ))}
                </select>
                <p style={{ color: "lightgray" }}>
                  List of mandals under selected district
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="policeStation">
                  Police Station <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="policeStationSelect"
                  className="form-control"
                  onChange={handlePoliceStationChange}
                  required
                >
                  <option value="">Select a Police Station</option>
                  {policeStations.map((ps) => (
                    <option key={ps.id} value={ps.id}>
                      {ps.name}
                    </option>
                  ))}
                </select>
                <p style={{ color: "lightgray" }}>Select your police station</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="acnumber">
                  AC Number
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="acnumber"
                  name="acnumber"
                  value={formData.acnumber}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: "lightgray" }}>
                  Enter assembly constituency number
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="policeStationNumber">
                  Police Station Number
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="policeStationNumber"
                  name="policeStationNumber"
                  value={formData.policeStationNumber}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: "lightgray" }}>
                  Enter poling station number
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="pollingStationName">
                  Polling Station Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="pollingStationName"
                  name="pollingStationName"
                  value={formData.pollingStationName}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: "lightgray" }}>
                  Enter police station location name
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="pollingStationNumber">
                  Polling Station Number <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="pollingStationNumber"
                  name="pollingStationNumber"
                  value={formData.pollingStationNumber}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: "lightgray" }}>
                  Enter polling station location number
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="pollingRoute">
                  Polling Route Number <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="pollingRoute"
                  name="pollingRoute"
                  value={formData.pollingRoute}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: "lightgray" }}>
                  Enter exact distribution route
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="polingStationPhoto">
                  Polling Station Photo <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="polingStationPhoto"
                  name="polingStationPhoto"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    // console.log(image);
                  }}
                  onBlur={uploadImagetodata}
                  required
                />
                <p style={{ color: "lightgray" }}>Refer below image</p>
              </div>
              <img
                  src={ps}
                  alt="referImage"
                  width={400}
                />
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="latitude">
                  Latitude <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="latitude"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: "lightgray" }}>
                  Please eneter exact latitude
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="longitude">
                  Longitude <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="longitude"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: "lightgray" }}>
                  Please enter exact longitude
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="categoryOfLocation">
                  Location Category <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="categoryOfLocation"
                  className="form-control"
                  onChange={handleCategoryChange}
                  name="categoryOfLocation"
                  required
                >
                  <option value="">Select a Category</option>
                  <option value="Normal">Normal</option>
                  <option value="Critical">Critical</option>
                </select>
                <p style={{ color: "lightgray" }}>Select normal or critical</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="numberOfPollingStationsForFemales">
                  Number of Polling Stations for Females
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="numberOfPollingStationsForFemales"
                  name="numberOfPollingStationsForFemales"
                  value={formData.numberOfPollingStationsForFemales}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: "lightgray" }}>
                  Polling Stations belong Females
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="numberOfPolingStationsForMales">
                  Number of Polling Stations for Males{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="numberOfPollingStationsForMales"
                  name="numberOfPollingStationsForMales"
                  value={formData.numberOfPollingStationsForMales}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: "lightgray" }}>
                  Polling Stations belong to Males
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="numberOfPollingStationsForTransgenders">
                  Number of Polling Stations for Transgenders{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="numberOfPollingStationsForTransgenders"
                  name="numberOfPollingStationsForTransgenders"
                  value={formData.numberOfPollingStationsForTransgenders}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: "lightgray" }}>
                  Polling Stations belong to Transgenders
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="totalVoters">
                  Total Voters
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="totalVoters"
                  name="totalVoters"
                  value={formData.totalVoters}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: "lightgray" }}>enter total voters</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="evmStrongRoomLocation">
                  EVM Strong Room Location{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="evmStrongRoomLocation"
                  name="evmStrongRoomLocation"
                  value={formData.evmStrongRoomLocation}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="evmDistributionPointLocation">
                  EVM Distribution Point Location{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="evmDistributionPointLocation"
                  name="evmDistributionPointLocation"
                  value={formData.evmDistributionPointLocation}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="icDCPphn">
                  I/C DCP Ph.no <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="icDCPphn"
                  name="icDCPphn"
                  value={formData.icDCPphn}
                  onChange={handleChange}
                  required
                />
              </div>
              <p style={{ color: "lightgray" }}>enter DCP Phone number</p>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="icACPphn">
                  I/C ACP Ph.no <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="icACPphn"
                  name="icACPphn"
                  value={formData.icACPphn}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="shophn">
                  SHO Ph.no <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="shophn"
                  name="shophn"
                  value={formData.shophn}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="strikingForceIC">
                  Striking Force I/C <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="strikingForceIC"
                  name="strikingForceIC"
                  value={formData.strikingForceIC}
                  onChange={handleChange}
                  required
                />
              </div>
              <p style={{ color: "lightgray" }}>enter striking force i/c</p>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="revenueSectorIC">
                  Revenue Sector I/C <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="revenueSectorIC"
                  name="revenueSectorIC"
                  value={formData.revenueSectorIC}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="localPoliceIC">
                  Local(police) I/C <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="localPoliceIC"
                  name="localPoliceIC"
                  value={formData.localPoliceIC}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="policeRouteIC">
                Police Route I/C <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="policeRouteIC"
                name="policeRouteIC"
                value={formData.policeRouteIC}
                onChange={handleChange}
                required
              />
            <p style={{ color: "lightgray" }}>
                Enter exact police route
              </p>
          </div>
          </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="qrtIC">
                  QRT I/C <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="qrtIC"
                  name="qrtIC"
                  value={formData.qrtIC}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="latitude">
                  Returning Authority <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="returningOfficer"
                  name="returningOfficer"
                  value={formData.returningOfficer}
                  onChange={handleChange}
                  required
                />
                <p style={{ color: "lightgray" }}>
                  Please eneter returning officer
                </p>
              </div>
            </div>

          </div>

          <div className="row">
            <div className="col-md-4 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary m-3"
                onClick={cancelHandler}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleRefresh}
              >
                Refresh
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ElectionForm;
