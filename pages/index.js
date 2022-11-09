import Head from "next/head";
import { AuthNav } from "../app/modules/authetication/auth-nav";
import { Signin } from "../app/modules/authetication/sign-in";

export default function Home() {
	return (
		<div className="App">
			<Head>
				<title>Bridgecard - Super Admin</title>
				<meta
					property="og:title"
					content={`Bridgecard - Card issuer for Africa`}
				/>
				<meta
					name="description"
					content={`Issue physical or virtual cards that carry a MasterCard or Visa logo to your users with our card issuing APIs. Get started in a week.`}
				/>

				<meta name="twitter:card" content="summary" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="keywords"
					content="virtual card, card issuing APIs, Issue virtual card APIs, Mastercard, Fintech, Union54, Flutterwave, Card issuing provider Nigeria, VIRTUAL card Issuing APIs,  Issue physical or virtual cards, Card issuing provider Nigeria"
				/>
				<meta name="twitter:site" content="@mybridgecard" />
				<meta
					name="twitter:title"
					content="Bridgecard - Card Issuer for Africa"
				/>
				<meta
					name="twitter:description"
					content="Issue Visa and Mastercards' profitably to your users."
				/>
				<meta
					name="twitter:image"
					content="https://firebasestorage.googleapis.com/v0/b/bridgecard-5d646.appspot.com/o/website_assets%2Fyellow.png?alt=media&token=ca4218e4-8c63-4102-89c2-5866e742c908"
				/>
				<meta name="twitter:url" content="https://bridgecard.co" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<section className="auth">
				<AuthNav />
				<Signin />
			</section>
		</div>
	);
}
