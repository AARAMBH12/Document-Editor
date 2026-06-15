import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import docsIcon from "../images/docsIcon.png";
import deleteImg from "../images/delete.png";
import { MdDelete } from "react-icons/md";
import { apiFetch } from '../Helper';

const Docs = ({ docs }) => {
  const [error, setError] = useState("");
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const docID = `doc-${docs._id}`;

  const navigate=useNavigate();

  const deleteDoc = (id, docID) => {
    let doc = document.getElementById(docID);
    apiFetch("/deleteDoc", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ docId: id, userId: localStorage.getItem("userId") }),
    })
      .then((data) => {
        if (data.success === false) {
          setError(data.message);
        } else {
          setIsDeleteModelShow(false);
          setTimeout(() => {
            alert(data.message);
          }, 100);
          if (doc && doc.remove) doc.remove();
        }
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
        setError("An error occurred while deleting the document.");
      });
  };


  return (
    <>
      {/* Document Card */}
      <div id={docID} className="docs cursor-pointer rounded-lg flex items-center justify-between p-[10px] bg-[#F0F0F0] mt-2 transition-all hover:bg-[#DCDCDC]">
        <div onClick={()=>{navigate(`/createDocs/${docs._id}`)}} className="left flex items-center gap-2">
          <img src={docsIcon} alt="Document" />

          <div>
            <h3 className="text-[20px]">
              {docs.title}
            </h3>

            <p className="text-[14px] text-[#808080]">
              Created In : {new Date(docs.date || docs.createdAt || docs._id).toDateString()} | Last Updated : {new Date(docs.lastUpdate || docs.updatedAt || docs.updatedAt).toDateString()}
            </p>
          </div>
        </div>

        <div className="docsRight">
          <i
            onClick={() => setIsDeleteModelShow(true)}
            className="text-[30px] text-red-500 cursor-pointer transition-all hover:text-red-600"
          >
            <MdDelete />
          </i>
        </div>
      </div>

      {/* Delete Modal */}
      {isDeleteModelShow && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[35vw] min-w-[450px]">
            <h3 className="text-[22px] font-medium mb-5">
              Delete Document
            </h3>

            <div className="flex items-center gap-4">
              <img
                src={deleteImg}
                alt="Delete"
                className="w-24 h-24 object-contain"
              />

              <div>
                <h3 className="text-[22px] font-medium">
                  Do You Want to Delete This Document?
                </h3>

                <p className="text-[14px] text-[#808080] mt-1">
                  Delete / Cancel
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={() => { deleteDoc(docs._id, docID) }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition-all"
              >
                Delete
              </button>

              <button
                onClick={() => setIsDeleteModelShow(false)}
                className="flex-1 bg-[#D1D5DB] hover:bg-[#bfc4cb] text-black py-3 rounded-lg transition-all"
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

export default Docs;