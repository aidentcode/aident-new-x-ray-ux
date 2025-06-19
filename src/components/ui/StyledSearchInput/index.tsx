import { styled, TextField } from "@mui/material";

const StyledSearchInput = styled(TextField)({
    "& label.Mui-focused": {
        color: "#e6be67",
    },
    // "& .MuiInput-underline:after": {
    //     // borderBottomColor: "#e6be67",
    // },
    "& .MuiInputAdornment-root": {
        color: "#636165",
    },
    "& .MuiOutlinedInput-root": {
        borderRadius: 32,
        color: "#ffffff",
        borderWidth: 1,
        "& fieldset": {
            borderColor: "#636165",
        },
        "&:hover": {
            "& .MuiInputAdornment-root": {
                color: "#e6be67",
            },
        },
        "&:hover fieldset": {
            borderColor: "#e6be67",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#e6be67",
            //borderWidth: 1,
        },
        "&.Mui-focused": {
            "& .MuiInputAdornment-root": {
                // color: "#ffaa1b",
                color: "#e6be67",
            },
        },
    },
    "& .MuiOutlinedInput-input": {
        fontWeight: 300,
    },
    "& .MuiFormHelperText-root": {
        marginBottom: 4,
    },
});

export const SmallStyledSearchInput = styled(TextField)({
    "& label.Mui-focused": {
        color: "#e6be67",
        borderBottomColor: "#e6be67",
    },
    "& .MuiInput-underline:before": {
        color: "#e6be67",
        borderBottomColor: "#e6be67",
    },
    "& .MuiInput-underline:after": {
        color: "#e6be67",
        borderBottomColor: "#e6be67",
    },
    "& .MuiInput-root": {
        "& fieldset": {
            color: "#e6be67",
            borderColor: "#e6be67",
        },
        "&:hover fieldset": {
            color: "#e6be67",
            borderColor: "#e6be67",
        },
        "&.Mui-focused fieldset": {
            color: "#e6be67",
            borderColor: "#ffaa1b",
        },
        "&.Mui-focused": {
            "& .MuiInputAdornment-root": {
                color: "#ffaa1b",
            },
        },
    },
    "& .MuiInput-input": {
        fontWeight: 200,
        fontSize: 12,
    },
    // "& .MuiInput-root::before": {
    //     borderBottomColor: "red",
    // },
    "&:hover .MuiInput-underline:before": {
        borderBottomColor: "#ffaa1b",
    },
    "& .MuiFormHelperText-root": {
        marginBottom: 4,
    },
    "& .MuiSvgIcon-root": {
        fontSize: 16,
    },
});

export default StyledSearchInput;
