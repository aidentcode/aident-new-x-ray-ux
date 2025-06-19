import { ThemeProvider, createTheme } from "@mui/material";
import styles from "./layout.module.scss";
import Head from "next/head";
import clsx from "clsx";
import { T_genericUser } from "@/lib/types/types";
import { E_headerDisplayType, E_userStatus } from "@/lib/enums";
import Header from "../Header";
import { useContext } from "react";
import XrayContext from "@/contexts/xrayContext";

//Create your Own theme:
const iconTheme = createTheme({
    palette: {
        primary: {
            main: "#e6be67", //logo-color
        },
        secondary: {
            main: "#e6be67", //gold
            dark: "#e6be67", //gold
        },
        info: {
            main: "#9e5aff", //purple
        },
        warning: {
            light: "#eda9a2", //peach
            main: "#eda9a2", //peach
            dark: "#eda9a2", //peach
        },
        error: {
            light: "#eda9a2", //peach
            main: "#eda9a2", //peach
            dark: "#eda9a2", //peach
        },
    },
});

type LayoutProps = React.ButtonHTMLAttributes<HTMLElement> & {
    title: string;
    description: string;
    contentTitle?: string;
    showBack?: boolean;
    user?: T_genericUser;
    hideHeader?: boolean;
    headerDisplayType?: E_headerDisplayType;
};

function Layout({
    className,
    children,

    title,
    description,
    contentTitle,
    showBack,
    user,
    hideHeader,
    headerDisplayType,
}: LayoutProps) {
    const mainCls = clsx([styles.main, className]);

    let headerDisplayType2: E_headerDisplayType | undefined;
    const xrayContext = useContext(XrayContext);
    if (!headerDisplayType) {
        const { imageSetup } = xrayContext;
        headerDisplayType2 = E_headerDisplayType.BeforeXRay;
        if (imageSetup) headerDisplayType2 = E_headerDisplayType.AfterXRay;
    } else {
        headerDisplayType2 = headerDisplayType;
    }
    // console.log("headerDisplayType2=", headerDisplayType2);

    return (
        <ThemeProvider theme={iconTheme}>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={mainCls}>
                {!hideHeader && (
                    <Header
                        title={contentTitle || ""}
                        showBack={showBack ?? false}
                        user={
                            user ?? {
                                id: "",
                                tnc: true,
                                clinic_name: "",
                                email_id: "",
                                status: E_userStatus.accepted,
                            }
                        }
                        headerDisplayType={headerDisplayType2}
                    />
                )}
                <div className={styles["content"]}>{children}</div>
            </main>
        </ThemeProvider>
    );
}

export default Layout;
