import React from "react";
import styles from "./CardsModal.module.scss";
import { Formik, Form, FieldArray } from "formik";
import SVG from "react-inlinesvg";

const metaValues = {
	meta: [
		{
			name: "",
			value: "",
		},
	],
};

export const MetaForm = ({ setMeta }) => (
	<div>
		<h3 className={styles.formSectionHeading}>Add meta</h3>
		<Formik
			initialValues={metaValues}
			onSubmit={async values => {
				setMeta(values.meta);
			}}
		>
			{props => (
				<Form>
					<FieldArray name="meta">
						{({ insert, remove, push }) => (
							<div>
								{props.values.meta.length > 0 &&
									props.values.meta.map((singleMeta, index) => (
										<React.Fragment key={index}>
											<div className="meta-holder">
												{" "}
												<button
													type="button"
													className="delete-meta-btn"
													onClick={() => remove(index)}
												>
													Remove
												</button>
											</div>

											<div className="grid-input">
												<div className="auth-input-container">
													<input
														type="text"
														className={"auth-input"}
														placeholder="Key"
														onChange={props.handleChange}
														onBlur={props.handleBlur}
														value={singleMeta.name}
														name={`meta.${index}.name`}
													/>
												</div>

												<div className="auth-input-container">
													<input
														type="text"
														className={"auth-input"}
														placeholder="Value"
														onChange={props.handleChange}
														onBlur={props.handleBlur}
														value={singleMeta.value}
														name={`meta.${index}.value`}
													/>
												</div>
											</div>
										</React.Fragment>
									))}

								<div className="global-flex">
									<button
										type="button"
										className="meta-btn"
										onClick={() => push({ name: "", value: "" })}
									>
										<SVG src={"../media/svg/cards/plus.svg"} />
										<span> Add New</span>
									</button>

									<button
										type="button"
										className="meta-btn mll"
										onClick={props.handleSubmit}
									>
										Done
									</button>
								</div>
							</div>
						)}
					</FieldArray>
				</Form>
			)}
		</Formik>
	</div>
);
