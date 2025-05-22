import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { NotFound } from "./pages/not-found";
import { ShortenedUrl } from "./pages/shortened-url";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/:shortened_url",
		element: <ShortenedUrl />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);
