import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdHelpOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import userServices from "../services/userServices";

const DeleteEventModal = ({ setShowDeleteMenu, eventId }) => {
	const [isSubmit, setIsSubmit] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isFailure, setIsFailure] = useState(false);

    const navigate = useNavigate()

	const deleteEvent = async (data) => {
		setIsSubmit(true);
		const result = await userServices.deleteEvent(data);
		console.log(result);
		if (result.status === "fail") {
			setIsSubmit(false);
			setIsFailure(true);
		}

		if (result.status === "success") {
			setIsSuccess(true);
			setTimeout(() => {
                setShowDeleteMenu(false)
				navigate("/dashboard/upcoming_events");
			}, 1000);
		}
	};
	return (
		<>
			<div className='flex justify-center z-50 items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none'>
				<div
					className='fixed inset-0 w-full h-full bg-black opacity-60'
					onClick={() => setShowDeleteMenu(false)}></div>
				<div className='relative my-6 mx-auto w-full'>
					<div className='w-[90%] lg:w-[40%] max-w-[500px] mx-auto border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none'>
						<div className='border-b border-[#CFD8DC]'>
							<div className='p-4'>
								<div className='flex justify-end w-full'>
									<span
										onClick={() => setShowDeleteMenu(false)}
										className='bg-[#FAFAFA] cursor-pointer text-[#717172] flex justify-center items-center rounded-full h-[35px] w-[35px]'>
										<IoMdClose />
									</span>
								</div>
								<div className='flex justify-center'>
									<div className='text-6xl text-red-600'>
										<MdHelpOutline />
									</div>
								</div>
								<div className='md:w-[70%] mx-auto mt-5 text-center'>
									<h1 className='text-[1.4rem] mb-2 text-black font-semibold'>
										Are you sure you want to delete event.
									</h1>
									<p className='font-normal text-[1rem] mb-2 text-black'>
										This item will be deleted immediately you can’t undo this
										action
									</p>
									<div className='mt-8 flex justify-between w-[70%] mx-auto'>
										<button
											onClick={() => setShowDeleteMenu(false)}
											className='py-[10px] px-6 rounded-[4px] bg-[#0056D6] border border-[#0056D6] text-white w-fit text-sm'>
											Cancel
										</button>
										<button
											onClick={() => deleteEvent(eventId)}
											className='py-[10px] px-6 rounded-[4px] text-[#0056D6] border border-[#0056D6] w-fit text-sm'>
											{isSubmit ? (
												<span>Deleting...</span>
											) : isFailure ? (
												<span> Try again </span>
											) : isSuccess ? (
												<span>Successful Deletion</span>
											) : (
												<span>Delete</span>
											)}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DeleteEventModal;
