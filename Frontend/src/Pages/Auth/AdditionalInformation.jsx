import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function AdditionalInformation() {
  const [formData, setFormData] = useState({
    phoneNo: '',
    DOB: undefined,
    Address: '',
  });

  const [editMode, setEditMode] = useState({
    phoneNo: false,
    DOB: false,
    Address: false,
  });

  const getData = () => {
    axios
      .get('https://ayurveda-backend.onrender.com/api/v1/getAddDetial', { withCredentials: true })
      .then((res) => {
        const payload = {
          phoneNo: res.data.data.phone,
          DOB: res.data.data.DOB,
          Address: res.data.data.address,
        };
        setFormData(payload);
      })
      .catch((err) => {
        //consolelog(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post('https://ayurveda-backend.onrender.com/api/v1/addDetails', formData, { withCredentials: true })
      .then((res) => {
        //consolelog(res.data);
        toast.success(res.data.message);
      })
      .catch((err) => {
        //consolelog(err);
        toast.error(err.response.data.message);
      });
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEdit = (field) => {
    setEditMode((prevMode) => ({
      ...prevMode,
      [field]: !prevMode[field],
    }));
  };

  return (
    <div className="p-6 bg-green-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-green-700 mb-6">Additional Information</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-green-600 font-medium mb-2">Phone Number</label>
            <div className="flex items-center">
              <input
                onChange={changeHandler}
                name="phoneNo"
                value={formData.phoneNo}
                type="tel"
                disabled={!editMode.phoneNo}
                className={`border rounded-lg p-2 flex-grow ${
                  editMode.phoneNo ? 'border-green-400' : 'border-gray-300 bg-gray-100'
                }`}
              />
              <button
                type="button"
                onClick={() => toggleEdit('phoneNo')}
                className="ml-3"
              >
                {editMode.phoneNo ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-green-600 font-medium mb-2">Date of Birth</label>
            <div className="flex items-center">
              <input
                onChange={changeHandler}
                name="DOB"
                value={formData.DOB || ''}
                type="date"
                disabled={!editMode.DOB}
                className={`border rounded-lg p-2 flex-grow ${
                  editMode.DOB ? 'border-green-400' : 'border-gray-300 bg-gray-100'
                }`}
              />
              <button
                type="button"
                onClick={() => toggleEdit('DOB')}
                className="ml-3"
              >
                {editMode.DOB ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-green-600 font-medium mb-2">Address</label>
            <div className="flex items-center">
              <input
                onChange={changeHandler}
                name="Address"
                value={formData.Address}
                type="text"
                disabled={!editMode.Address}
                className={`border rounded-lg p-2 flex-grow ${
                  editMode.Address ? 'border-green-400' : 'border-gray-300 bg-gray-100'
                }`}
              />
              <button
                type="button"
                onClick={() => toggleEdit('Address')}
                className="ml-3"
              >
                {editMode.Address ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdditionalInformation;
