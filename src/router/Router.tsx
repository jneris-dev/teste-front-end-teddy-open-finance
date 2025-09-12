import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Home from "../pages/Home";
import Welcome from "../pages/Welcome";

export function Router() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<Routes>
      <Route path="*" element={<Navigate replace to="/" />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/" element={<Home />} />
		</Routes>
	);
}
