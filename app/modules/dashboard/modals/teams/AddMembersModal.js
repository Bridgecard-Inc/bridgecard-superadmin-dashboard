import React, { useState } from "react";
import styles from "./TeamsModal.module.scss";
import { motion } from "framer-motion";
import SVG from "react-inlinesvg";
import { useAuthContext } from "../../../../firebase/AuthContext";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { callApiWithToken } from "../../../../utils/callApiWithToken";

export const AddMembersModal = () => {
	const [message, setMessage] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const context = useAuthContext();
	const { environment, admindetails } = useSelector(state => state.app);

	const { isTeamsCardModalVisible, setIsTeamsCardModalVisible, cardChanged } =
		context;

	const url = `admin/team/invite`;

	const closeModal = () => {
		setIsTeamsCardModalVisible(false);
		cardChanged();
		setMessage(null);
	};
	const containerVariants = {
		hidden: {
			y: "-200px",
			opacity: 0,
		},
		visible: {
			y: 0,
			opacity: 1,
			transition: { delay: 0, duration: 0.5 },
		},
		exit: {
			y: "-200px",
			opacity: 0,
			transition: { ease: "easeInOut" },
		},
	};

	const membersToAdd = {
		emails: [""],
	};

	const validationSchema = Yup.object().shape({
		amount: Yup.string().required("This is a required field"),
		currency: Yup.string().required("This is a required field"),
	});

	return (
		isTeamsCardModalVisible && (
			<Formik
				initialValues={membersToAdd}
				onSubmit={async values => {
					setIsSubmitting(true);
					const addMembers = async token => {
						try {
							const res = await axios.post(url, values, {
								headers: {
									token: `Bearer ${token}`,
								},
							});
							setMessage(res.data.data.results);
						} catch (err) {
						} finally {
							setIsSubmitting(false);
						}
					};
					callApiWithToken(addMembers);
				}}
			>
				{props => (
					<motion.div className={styles.deleteModalWrapper}>
						<motion.div
							className={styles.autoModalCard}
							variants={containerVariants}
							initial="hidden"
							animate="visible"
						>
							<div className={styles.modalHeader}>
								<h2>Add team members</h2>
								<div className={styles.cancel} onClick={closeModal}>
									{" "}
									<SVG src={"../media/svg/send/cancel.svg"} />
								</div>
							</div>
							<div className={styles.autoModalBody}>
								<div className={styles.modalForm}>
									<Form>
										<FieldArray name="emails">
											{({ insert, remove, push }) => (
												<div>
													{props.values.emails.length > 0 &&
														props.values.emails.map((member, index) => (
															<React.Fragment key={index}>
																<div className="meta-holder">
																	{" "}
																	<button
																		type="button"
																		className="delete-meta-btn"
																		onClick={() => remove(index)}
																		disabled={props.values.emails.length === 1}
																	>
																		Remove
																	</button>
																</div>

																<div className="auth-input-container">
																	<input
																		type="text"
																		className={"auth-input"}
																		placeholder="Email"
																		onChange={props.handleChange}
																		onBlur={props.handleBlur}
																		value={member}
																		name={`emails.${index}`}
																	/>
																</div>

																{message && (
																	<div
																		className={
																			message[index]?.status === "success"
																				? "success-message"
																				: "error-message"
																		}
																	>
																		<p>
																			{message[index]?.status === "success"
																				? "Member added successfuly"
																				: message[index]?.error_message}
																		</p>
																	</div>
																)}
															</React.Fragment>
														))}

													<div className="global-flex">
														<button
															type="button"
															className="meta-btn"
															onClick={() => push("")}
														>
															<SVG src={"../media/svg/cards/plus.svg"} />
															<span> Add New</span>
														</button>
													</div>
												</div>
											)}
										</FieldArray>
									</Form>
								</div>
							</div>
							<div className={styles.modalFooter}>
								<button
									className="add-members-btn"
									type="button"
									disabled={!(props.isValid || isSubmitting)}
									onClick={props.handleSubmit}
								>
									{" "}
									{isSubmitting ? (
										<ThreeDots color="#141416" height={40} width={40} />
									) : (
										"Add Members"
									)}
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</Formik>
		)
	);
};
