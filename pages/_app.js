import "../styles/app.scss";
import { Layout } from "../app/modules/dashboard/layout/Layout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import axios from "axios";
import store, { persistor } from "../app/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "../app/firebase/AuthContext";
import { AuthRoute } from "../app/modules/dashboard/layout/AuthRoute";

import "line-awesome/dist/line-awesome/css/line-awesome.min.css";

axios.defaults.baseURL =
	"https://bridgecard-issuing-app.com/admin-auth-service-v2/v1/";
axios.defaults.timeout = 60000;

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	return (
		<React.Fragment>
			<AuthProvider>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						{router.pathname.includes("dashboard") ? (
							<AuthRoute>
								<Layout>
									<Component {...pageProps} />
								</Layout>
							</AuthRoute>
						) : (
							<Component {...pageProps} />
						)}
					</PersistGate>
				</Provider>
			</AuthProvider>
		</React.Fragment>
	);
}

export default MyApp;
