import { Box, styled } from "@mui/material";

const Col = styled(Box)({});
Col.defaultProps = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
};

export default Col;