import * as React from "react";
import Container from "@mui/material/Container";
import Footer from "../footer";
import Header from "../header";

const Page = ({ children, fluid }: { children: React.ReactNode, fluid?: boolean }) => {
  return (<>
    <Header/>
    <Container component="main" fixed>{children}</Container>
    <Footer />
  </>)
}

export default Page
