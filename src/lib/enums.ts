export enum E_xrayType {
    "rvg" = "rvg",
    "opg" = "opg",
    "unknown" = "unknown",
}
export enum E_modalType {
    "logout" = "logout",
    "tutorial" = "tutorial",
    "invalidXray" = "invalidXray",
    "comingSoon" = "comingSoon",
    "error" = "error",
    "unknown" = "unknown",
}
export enum E_signupType {
    "google" = "google",
    "facebook" = "facebook",
    "apple" = "apple",
    "github" = "github",
    "emailPassword" = "emailPassword",
    "emailOTP" = "emailOTP",
    "magicLink" = "magicLink",
    "unknown" = "unknown",
}
export enum E_userRole {
    "superUser" = "superUser",
    "admin" = "admin",
    "customer" = "customer",
    "partner" = "partner",
    "support" = "support",
    "unknown" = "unknown",
}
export enum E_userStatus {
    "active" = "active",
    "blocked" = "blocked",
    "inactive" = "inactive",
    "pending" = "pending",
    "accepted" = "accepted",
    "unknown" = "unknown",
}
export enum E_headerDisplayType {
    Home = "Home",
    Profile = "Profile",
    BeforeXRay = "BeforeXRay",
    AfterXRay = "AfterXRay",
}

export enum E_colorCode {
    "red" = "red",
    "orange" = "orange",
    "yellow" = "yellow",
    "lightGreen" = "lightGreen",
    "green" = "green",
    "darkGreen" = "darkGreen",
    "teal" = "teal",
    "lightBlue" = "lightBlue",
    "blue" = "blue",
    "pink" = "pink",
    "purple" = "purple",
    "peach" = "peach",
    "white" = "white",
    "black" = "black",
    "brown" = "brown",
    "lightBrown" = "lightBrown",
    "gold" = "gold",
    "lemon" = "lemon",
    "gray" = "gray",
    "maroon" = "maroon",
    "magenta" = "magenta",
}
export enum E_fabricMouseClickCode {
    "LEFT_CLICK" = 1,
    "MIDDLE_CLICK" = 2,
    "RIGHT_CLICK" = 3,
}
export enum E_editMode {
    "rotate" = "rotate",
    "crop" = "crop",
    "none" = "",
}
export enum E_conditionType {
    "pathological" = "pathological",
    "non-pathological" = "non-pathological",
    "none" = "",
}
export enum E_opgClassId {
    "unknown" = "-1",
    "undefined" = "0",
    "abscess" = "1",
    "attrition" = "2",
    "boneLoss" = "3",
    "braces" = "4",
    "calculus" = "5",
    "caries" = "6",
    "caries2" = "7",
    "crown" = "8",
    "cyst" = "9",
    "filling" = "10",
    "fractureLine" = "11",
    "furcation" = "12",
    "impacted" = "13",
    "implant" = "14",
    "nerve" = "15",
    "rootCanal" = "16",
    "rootPiece" = "17",
    "sinus" = "18",
    "uneruptedTooth" = "19",
    "new" = "20",
}

export enum E_rvgClassId {
    "unknown" = "-1",
    "abscess" = "0",
    "attrition" = "1",
    "boneLoss" = "2",
    "calcification" = "3",
    "calculus" = "4",
    "caries" = "5",
    "crown" = "6",
    "cyst" = "7",
    "filling" = "8",
    "fractureLine" = "9",
    "furcation" = "10",
    "impacted" = "11",
    "implant" = "12",
    "nerve" = "13",
    "pulp" = "14",
    "rootCanal" = "15",
    "rootPiece" = "16",
    "sinus" = "17",
    "tooth" = "18",
    "uneruptedTooth" = "19",
    "new" = "20",
}

export enum E_conditionStatus {
    "pending" = "pending",
    "rejected" = "rejected",
    "accepted" = "accepted",
}

export enum E_tooth3dId {
    "select-tooth" = "select-tooth",
    "tooth-incisor-2" = "tooth-incisor-2",
    "tooth-incisor-1" = "tooth-incisor-1",
    "tooth-canine-1" = "tooth-canine-1",
    "tooth-premolar-2" = "tooth-premolar-2",
    "tooth-premolar-1" = "tooth-premolar-1",
    "tooth-molar-3" = "tooth-molar-3",
    "tooth-molar-2" = "tooth-molar-2",
    "tooth-molar-1" = "tooth-molar-1",
}

export enum E_tooth3dPosition {
    "top-left" = "top-left",
    "top-right" = "top-right",
    "bottom-left" = "bottom-left",
    "bottom-right" = "bottom-right",
}
