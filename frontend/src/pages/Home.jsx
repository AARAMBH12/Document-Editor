import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Docs from '../components/Docs';
import { BsPlusLg } from "react-icons/bs";
import { MdOutlineTitle } from "react-icons/md";
import { apiFetch } from '../Helper';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const [data, setData] = useState(null);


  const navigate = useNavigate();

  const openCreateModal = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate('/login');
      return;
    }
    setIsCreateModelShow(true);
    setError("");
    setTimeout(() => {
      document.getElementById("title")?.focus();
    }, 0);
  };

  const createDoc = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate('/login');
      return;
    }
    if (title.trim() === "") {
      setError("Please enter title");
      return;
    }

    apiFetch("/createDoc", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ docName: title, userId }),
    })
      .then((data) => {
        if (data.success) {
          setIsCreateModelShow(false);
          navigate(`/createDocs/${data.docId}`);
        } else {
          setError(data.message || 'Failed to create document');
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.body?.message || err.message || 'Failed to create document');
      });
  };
  const getData = () => {
    apiFetch("/getAllDocs", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: localStorage.getItem("userId") }),
    })
      .then((data) => setData(data.docs || []))
      .catch((err) => {
        console.error(err);
        setError(err.body?.message || err.message || 'Failed to load documents');
      });
  };
  useEffect(() => {
    getData();
  }, [])




  return (
    <>
      <Navbar />

      <div className="flex items-center justify-between px-[100px]">
        <h3 className="mt-3 mb-3 text-3xl">
          All Documents
        </h3>

        <button
          className="btnBlue"
          onClick={openCreateModal}
        >
          <i>
            <BsPlusLg />
          </i>
          Create New Document
        </button>
      </div>

      <div className="allDocs px-[100px] mt-4">
        {
          data ? data.map((el, index) => (
            <Docs key={el._id || index} docs={el} />
          )) : ""
        }

      </div>

      {isCreateModelShow && (
        <div className="fixed inset-0 bg-[rgb(0,0,0,.3)] flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[35vw]">
            <h3 className="text-[20px] mb-4">
              Create New Document
            </h3>

            <div className="inputCon">
              <p className="text-[14px] text-[#808080] mb-1">
                Title
              </p>

              <div className="inputBox w-full">
                <i>
                  <MdOutlineTitle />
                </i>

                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-2">
                  {error}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={createDoc}
                className="btnBlue flex-1"
              >
                Create New Document
              </button>

              <button
                onClick={() => {
                  setIsCreateModelShow(false);
                  setTitle("");
                  setError("");
                }}
                className="flex-1 p-[10px] bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
