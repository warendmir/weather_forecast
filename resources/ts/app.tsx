import "./bootstrap";
import "#/app.css";
import React from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/Header";
import List from "./components/List";
import { ThemeProvider } from "@material-tailwind/react";

const root = createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);

function App() {
    return (
        <React.StrictMode>
            <ThemeProvider>
                <Header />
                <List />
            </ThemeProvider>
        </React.StrictMode>
    );
}
