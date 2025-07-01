import styles from "./overviewContainer.module.scss";
import OverviewItem from "../OverviewItem";
import XrayContext from "@/contexts/xrayContext";
import { useContext, useState } from "react";
import EmptyMessage from "../EmptyMessage";
import { Search } from "@mui/icons-material";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputAdornment,
} from "@mui/material";
import StyledSearchInput from "../StyledSearchInput";
import { T_overviewItem } from "@/lib/types/types";
import { checkboxSx } from "@/lib/form-control-utils";
import { E_conditionStatus, E_conditionType } from "@/lib/enums";
import clsx from "clsx";
import CustomTooltip from "../CustomToolTip";

export default function OverviewContainer() {
    const { inferenceResponse, overviewItems, conditions } =
        useContext(XrayContext);
    const conditionCount = conditions.filter(
        (x) => x.status !== E_conditionStatus.rejected
    ).length;

    const [showAll, setShowAll] = useState(false);
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowAll(e.target.checked);
    };

    const [searchTerm, setSearchTerm] = useState("");
    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = (e.target.value || "").trim().toLowerCase();
        setSearchTerm(searchTerm);
    };

    const filteredList_pathology: T_overviewItem[] = [];
    const filteredList_nonPathology: T_overviewItem[] = [];
    const filteredList: T_overviewItem[] = [];

    overviewItems.forEach((item) => {
        const t1 = (item.label || "").toLowerCase();

        let showFlag1 = true;
        if (!showAll) {
            showFlag1 = item.items.length > 0;
        }
        const showFlag2 = t1.includes(searchTerm);
        const showFlag3 = item.status !== E_conditionStatus.rejected;

        if (showFlag1 && showFlag2 && showFlag3) {
            if (item.conditionType === E_conditionType.pathological) {
                filteredList_pathology.push(item);
            } else {
                filteredList_nonPathology.push(item);
            }
            filteredList.push(item);
        }
    });

    if (conditionCount === 0) {
        return (
            <EmptyMessage
                message={
                    inferenceResponse
                        ? "No conditions detected by AI"
                        : "Start scan to detect conditions"
                }
            />
        );
    }
    //  else if (filteredList.length === 0) {
    //     return <EmptyMessage message="No conditions to show" />;
    // }

    const displayPathology =
        filteredList_pathology.length > 0 ? "block" : "none";
    const displayNonPathology =
        filteredList_nonPathology.length > 0 ? "block" : "none";

    return (
        <div className={styles.overviewContainer}>
            <div className={styles.formContainer}>
                <FormControl
                    variant="standard"
                    className={styles["search-container"]}
                >
                    <StyledSearchInput
                        className="search-field"
                        label=""
                        id="search-list"
                        size="small"
                        fullWidth
                        variant="outlined"
                        placeholder="Search conditions"
                        value={searchTerm}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search className={styles.searchIcon} />
                                </InputAdornment>
                            ),
                        }}
                        onChange={onSearch}
                        error={
                            !filteredList.length && searchTerm ? true : false
                        }
                        helperText={
                            !filteredList.length && searchTerm
                                ? "No conditions matching the search"
                                : ""
                        }
                    />
                </FormControl>
                <CustomTooltip
                    title={
                        showAll
                            ? "Uncheck to show AI-detected conditions only"
                            : "Check to show all conditions"
                    }
                    placement="bottom"
                >
                    <FormControlLabel
                        className={styles["form-control-checkbox"]}
                        label="All"
                        control={
                            <Checkbox
                                color="secondary"
                                size="small"
                                checked={showAll}
                                onChange={(e) => handleCheckboxChange(e)}
                            />
                        }
                        sx={checkboxSx}
                    />
                </CustomTooltip>
            </div>
            <div className={styles.listContainer}>
                <div
                    className={clsx([
                        styles.listGroupContainer,
                        styles.pathology,
                    ])}
                    style={{ display: displayPathology }}
                >
                    <div className={styles.listGroupTitle}>Pathological</div>
                </div>
                {filteredList_pathology.map((item, index) => (
                    <>
                        <OverviewItem
                            key={`${item.classId}@${index}`}
                            item={item}
                        />
                    </>
                ))}
                <div
                    className={styles.horizontalSeparator}
                    style={{ display: displayPathology }}
                />
                <div
                    className={clsx([
                        styles.listGroupContainer,
                        styles.nonPathology,
                    ])}
                    style={{ display: displayNonPathology }}
                >
                    <div className={styles.listGroupTitle}>
                        Non-pathological
                    </div>
                </div>
                {filteredList_nonPathology.map((item, index) => (
                    <>
                        <OverviewItem
                            key={`${item.classId}@${index}`}
                            item={item}
                        />
                    </>
                ))}
            </div>
        </div>
    );
}
