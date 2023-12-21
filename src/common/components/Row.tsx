import { Box, styled } from "@mui/material";

const Row = styled(Box)({});
Row.defaultProps = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: '-15px',
    marginRight: '-15px',
    flexWrap: "wrap",
};

export default Row;