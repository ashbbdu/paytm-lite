import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { MdOutlineCancel } from "react-icons/md";
import { transferBalance } from "../services/operations/bankAPI";

export function PaymentModal({ userId, userName, icon ,getUserBalance }) {
  const dispatch = useDispatch()
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = React.useState(false);
  const [amount, setAmount] = useState(0);
  const handleBlanceTransfer = async () => {
    dispatch(transferBalance(userId , amount , setAmount , setShowModal ,getUserBalance , token))
  };
  return (
    <>
      <button
        className="bg-black text-white px-3 py-2 text-sm rounded-md"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Send Payment
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div
                onClick={() => setShowModal((prev) => !prev)}
                className="absolute z-10 right-3 top-5"
              >
                <MdOutlineCancel size={20} />
              </div>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none sm:w-[500px] w-[300px]">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl text-center font-semibold">
                    Send Money
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <h1> Sending money to {userName}</h1>
                  <div>
                    <form>
                      <div>
                        <label>Amount in ($)</label>
                        <br />
                        <input
                          onChange={(e) => setAmount(e.target.value)}
                          className=" w-full h-11 mt-1 rounded-md px-2 border border-slate-300"
                          type={"number"}
                        />
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleBlanceTransfer();
                        }}
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-4 w-full"
                      >
                        Initiate Transfer
                      </button>
                      <button
                        onClick={() => setShowModal((prev) => !prev)}
                        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-2 w-full"
                      >
                        Abort Transfer
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
