import styles from "./conditionListContainer.module.scss";
import XrayContext from "@/contexts/xrayContext";
import { useContext, useState } from "react";
import EmptyMessage from "../EmptyMessage";
import ListItem from "../ListItem";
import { T_condition } from "@/lib/types/types";
import { Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { FormControl } from "@mui/material";
import StyledSearchInput from "../StyledSearchInput";
import { E_conditionStatus } from "@/lib/enums";

export default function ConditionListContainer() {
    const { inferenceResponse, conditions, selectedConditionId } =
        useContext(XrayContext);
    const conditionCount = conditions.filter(
        (x) => x.status !== E_conditionStatus.rejected
    ).length;

    const [searchTerm, setSearchTerm] = useState("");
    // console.log("searchTerm=", searchTerm);
    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = (e.target.value || "").trim().toLowerCase();
        setSearchTerm(searchTerm);
    };

    const filteredList: T_condition[] = [];
    conditions.forEach((item) => {
        const t1 = (item.label || "").toLowerCase();

        const showFlag1 = t1.includes(searchTerm);
        const showFlag2 = item.status !== E_conditionStatus.rejected;

        if (showFlag1 && showFlag2) {
            filteredList.push(item);
        }
    });
    //console.log("filteredList=", filteredList.length);

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

    return (
        <div className={styles.conditionListContainer}>
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
            </div>
            <div className={styles.listContainer}>
                {filteredList.map((item, index) => (
                    <ListItem
                        key={`${item.id}@${index}`}
                        item={item}
                        isSelected={selectedConditionId === item.id}
                    />
                ))}
            </div>
        </div>
    );
}
