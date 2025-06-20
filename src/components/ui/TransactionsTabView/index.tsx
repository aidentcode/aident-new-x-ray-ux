import PrimaryButton from "../PrimaryButton";
import styles from "./transactionsTabView.module.scss";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const transactionHistoryDummyData = [
    {
        id: "8ada6354-254b-4d95-b7a3-303e497b2cf4",
        point: "40",
        type: "CREDIT",
        detail: "CREDITED with 40",
        dataoftransaction: "2025-05-24T13:45:48.699Z",
        balance: "50",
        payment: "0",
        userid: "c08bd5e8-891d-4aaf-a61c-4948b0e1653f",
        createdAt: "2025-05-24T13:45:49.218Z",
        updatedAt: "2025-05-24T13:45:49.218Z",
        __typename: "ClinicTransactionV2",
    },
    {
        id: "8ada6354-254b-4d95-b7a3-303e497b2cf5",
        point: "10",
        type: "DEBIT",
        detail: "DEBITED with 10",
        dataoftransaction: "2025-05-24T13:45:48.699Z",
        balance: "50",
        payment: "0",
        userid: "c08bd5e8-891d-4aaf-a61c-4948b0e1653f",
        createdAt: "2025-05-24T13:45:49.218Z",
        updatedAt: "2025-05-24T13:45:49.218Z",
        __typename: "ClinicTransactionV2",
    },
    {
        id: "8ada6354-254b-4d95-b7a3-303e497b2cf6",
        point: "40",
        type: "CREDIT",
        detail: "CREDITED with 40",
        dataoftransaction: "2025-05-24T13:45:48.699Z",
        balance: "50",
        payment: "0",
        userid: "c08bd5e8-891d-4aaf-a61c-4948b0e1653f",
        createdAt: "2025-05-24T13:45:49.218Z",
        updatedAt: "2025-05-24T13:45:49.218Z",
        __typename: "ClinicTransactionV2",
    },
    {
        id: "8ada6354-254b-4d95-b7a3-303e497b2cf7",
        point: "10",
        type: "DEBIT",
        detail: "DEBITED with 10",
        dataoftransaction: "2025-05-24T13:45:48.699Z",
        balance: "50",
        payment: "0",
        userid: "c08bd5e8-891d-4aaf-a61c-4948b0e1653f",
        createdAt: "2025-05-24T13:45:49.218Z",
        updatedAt: "2025-05-24T13:45:49.218Z",
        __typename: "ClinicTransactionV2",
    },
    {
        id: "8ada6354-254b-4d95-b7a3-303e497b2cf8",
        point: "40",
        type: "CREDIT",
        detail: "CREDITED with 40",
        dataoftransaction: "2025-05-24T13:45:48.699Z",
        balance: "50",
        payment: "0",
        userid: "c08bd5e8-891d-4aaf-a61c-4948b0e1653f",
        createdAt: "2025-05-24T13:45:49.218Z",
        updatedAt: "2025-05-24T13:45:49.218Z",
        __typename: "ClinicTransactionV2",
    },
    {
        id: "8ada6354-254b-4d95-b7a3-303e497b2cf9",
        point: "10",
        type: "DEBIT",
        detail: "DEBITED with 10",
        dataoftransaction: "2025-05-24T13:45:48.699Z",
        balance: "50",
        payment: "0",
        userid: "c08bd5e8-891d-4aaf-a61c-4948b0e1653f",
        createdAt: "2025-05-24T13:45:49.218Z",
        updatedAt: "2025-05-24T13:45:49.218Z",
        __typename: "ClinicTransactionV2",
    },
    {
        id: "8ada6354-254b-4d95-b7a3-303e497b2cf0",
        point: "40",
        type: "CREDIT",
        detail: "CREDITED with 40",
        dataoftransaction: "2025-05-24T13:45:48.699Z",
        balance: "50",
        payment: "0",
        userid: "c08bd5e8-891d-4aaf-a61c-4948b0e1653f",
        createdAt: "2025-05-24T13:45:49.218Z",
        updatedAt: "2025-05-24T13:45:49.218Z",
        __typename: "ClinicTransactionV2",
    },
    {
        id: "8ada6354-254b-4d95-b7a3-303e497b2cg0",
        point: "10",
        type: "DEBIT",
        detail: "DEBITED with 10",
        dataoftransaction: "2025-05-24T13:45:48.699Z",
        balance: "50",
        payment: "0",
        userid: "c08bd5e8-891d-4aaf-a61c-4948b0e1653f",
        createdAt: "2025-05-24T13:45:49.218Z",
        updatedAt: "2025-05-24T13:45:49.218Z",
        __typename: "ClinicTransactionV2",
    },
    {
        id: "8ada6354-254b-4d95-b7a3-303e497b2cg1",
        point: "10",
        type: "DEBIT",
        detail: "DEBITED with 10",
        dataoftransaction: "2025-05-24T13:45:48.699Z",
        balance: "50",
        payment: "0",
        userid: "c08bd5e8-891d-4aaf-a61c-4948b0e1653f",
        createdAt: "2025-05-24T13:45:49.218Z",
        updatedAt: "2025-05-24T13:45:49.218Z",
        __typename: "ClinicTransactionV2",
    },
    {
        id: "8ada6354-254b-4d95-b7a3-303e497b2cg2",
        point: "10",
        type: "DEBIT",
        detail: "DEBITED with 10",
        dataoftransaction: "2025-05-24T13:45:48.699Z",
        balance: "50",
        payment: "0",
        userid: "c08bd5e8-891d-4aaf-a61c-4948b0e1653f",
        createdAt: "2025-05-24T13:45:49.218Z",
        updatedAt: "2025-05-24T13:45:49.218Z",
        __typename: "ClinicTransactionV2",
    },
    {
        id: "8ada6354-254b-4d95-b7a3-303e497b2cg3",
        point: "10",
        type: "DEBIT",
        detail: "DEBITED with 10",
        dataoftransaction: "2025-05-24T13:45:48.699Z",
        balance: "50",
        payment: "0",
        userid: "c08bd5e8-891d-4aaf-a61c-4948b0e1653f",
        createdAt: "2025-05-24T13:45:49.218Z",
        updatedAt: "2025-05-24T13:45:49.218Z",
        __typename: "ClinicTransactionV2",
    },
    {
        id: "8ada6354-254b-4d95-b7a3-303e497b2cg4",
        point: "10",
        type: "DEBIT",
        detail: "DEBITED with 10",
        dataoftransaction: "2025-05-24T13:45:48.699Z",
        balance: "50",
        payment: "0",
        userid: "c08bd5e8-891d-4aaf-a61c-4948b0e1653f",
        createdAt: "2025-05-24T13:45:49.218Z",
        updatedAt: "2025-05-24T13:45:49.218Z",
        __typename: "ClinicTransactionV2",
    },
];

const StyledPaper = styled(Paper)({
    backgroundColor: "transparent",
    boxShadow: "none",
    border: "1px solid var(--border-color-1)",
    borderRadius: "8px",
});

const StyledTableCell = styled(TableCell)({
    color: "var(--text-color-2)",
    borderColor: "var(--border-color-1)",
});

const StyledTableHeadCell = styled(StyledTableCell)({
    color: "var(--text-color-3)",
    fontWeight: "bold",
});

export default function TransactionsTabView() {
    const handleRefresh = () => {
        console.log("TODO:Refreshing transactions. Make API call here");
    };

    return (
        <div className={styles.transactionsTab}>
            <div className={styles.transactionsTabTitle}>
                <div className={styles.transactionsTabTitleText}>
                    Transaction History
                </div>
                <div className={styles.saveButtonContainer}>
                    <PrimaryButton
                        btnTitle="Refresh"
                        onClick={handleRefresh}
                        disabled={false}
                        className={styles.saveButton}
                    />
                </div>
            </div>
            <div className={styles.transactionsTableContainer}>
                <TableContainer component={StyledPaper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableHeadCell>Date</StyledTableHeadCell>
                                <StyledTableHeadCell>Type</StyledTableHeadCell>
                                <StyledTableHeadCell>
                                    Description
                                </StyledTableHeadCell>
                                <StyledTableHeadCell>Point</StyledTableHeadCell>
                                <StyledTableHeadCell>
                                    Payment
                                </StyledTableHeadCell>
                                <StyledTableHeadCell>
                                    Balance
                                </StyledTableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactionHistoryDummyData.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <StyledTableCell>
                                        {new Date(
                                            row.createdAt
                                        ).toLocaleDateString() || "N/A"}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.type || "N/A"}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.detail || "N/A"}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.point || "N/A"}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.payment || "N/A"}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {row.balance || "N/A"}
                                    </StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
