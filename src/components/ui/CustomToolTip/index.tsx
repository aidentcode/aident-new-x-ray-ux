import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        background: "var(--tooltip-background)",
        color: "#26252c",
        boxShadow: theme.shadows[1],
        fontSize: 13,
        letterSpacing: 1,
        fontFamily: "sans-serif",
        fontWeight: 400,
        textAlign: "center",
        lineHeight: 1.5,
    },
}));

export default CustomTooltip;
