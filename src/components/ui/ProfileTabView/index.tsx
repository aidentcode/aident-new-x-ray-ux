import styles from "./profileTabView.module.scss";
import { sampleUser } from "@/lib/data/sample-responses";
import CreditsDisplay from "@/components/ui/CreditsDisplay";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Box } from "@mui/material";
import PrimaryButton from "@/components/ui/PrimaryButton";

type T_profileFormInput = {
    clinic_name: string;
    phone_no: string;
    address: string;
    city: string;
};

export default function ProfileTabView() {
    //TODO: Get these values from the backend
    const expiresOn = new Date("31 Dec 2025");
    const totalScans = 3;

    const {
        control,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<T_profileFormInput>({
        defaultValues: {
            clinic_name: sampleUser.clinic_name || "",
            phone_no: sampleUser.phone_no || "",
            city: sampleUser.city || "",
            address: sampleUser.address || "",
        },
    });

    const textFieldStyle = {
        "& .MuiInputBase-input": {
            color: "#d7d7d7",
        },
        "& .MuiInputLabel-root": {
            color: "#d7d7d7",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "var(--border-color-2)",
            },
            "&:hover fieldset": {
                borderColor: "var(--border-color-2)",
            },
            "&.Mui-focused fieldset": {
                borderColor: "var(--logo-color)",
            },
        },
    };

    const onSubmit: SubmitHandler<T_profileFormInput> = (data) => {
        console.log("Profile form data:", data);
        //TODO: Here you would typically handle the form submission, e.g., send to an API
    };

    return (
        <div className={styles.profileTab}>
            <div className={styles.packageDetails}>
                <div className={styles.profileTabTitle}>Current package</div>
                <div className={styles.scale1_5}>
                    <CreditsDisplay />
                </div>
                <div className={styles.detailRowContainer}>
                    <div className={styles.detailRow}>
                        <div className={styles.detailRowTitle}>Expires on:</div>
                        <div className={styles.detailRowValue}>
                            {expiresOn.toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </div>
                    </div>
                    <div className={styles.detailRow}>
                        <div className={styles.detailRowTitle}>
                            Total scans:
                        </div>
                        <div className={styles.detailRowValue}>
                            {totalScans}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.userDetails}>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mt: 2,
                    }}
                >
                    <Controller
                        name="clinic_name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Clinic Name"
                                sx={textFieldStyle}
                            />
                        )}
                    />
                    <Controller
                        name="phone_no"
                        control={control}
                        rules={{
                            pattern: {
                                value: /^[6-9]\d{9}$/,
                                message: "Invalid mobile number",
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Phone Number"
                                error={!!errors.phone_no}
                                helperText={errors.phone_no?.message}
                                sx={textFieldStyle}
                            />
                        )}
                    />
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Address"
                                multiline
                                rows={4}
                                sx={textFieldStyle}
                            />
                        )}
                    />
                    <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="City"
                                sx={textFieldStyle}
                            />
                        )}
                    />
                    {/* <Button type="submit" variant="contained">
                        Save
                    </Button> */}
                    <div className={styles.saveButtonContainer}>
                        <PrimaryButton
                            btnTitle="Save"
                            onClick={handleSubmit(onSubmit)}
                            disabled={!isDirty || !isValid}
                            className={styles.saveButton}
                        />
                    </div>
                </Box>
            </div>
        </div>
    );
}
