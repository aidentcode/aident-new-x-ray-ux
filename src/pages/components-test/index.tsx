import LoadingAnimation3d from "@/components/3d/LoadingAnimation3d";
import ColorIndicator from "@/components/ui/ColorIndicator";
import ConditionToolbox from "@/components/ui/ConditionToolbox";
import Layout from "@/components/ui/Layout";
// import ListItem from "@/components/ui/ListItem";
// import OverviewItem from "@/components/ui/OverviewItem";
import PageIcon from "@/components/ui/PageIcon";
import TabSwitch from "@/components/ui/TabSwitch";
import Toolbox2d from "@/components/ui/Toolbox2d";
import ToothSelection from "@/components/ui/ToothSelection";
import ToothToolbox from "@/components/ui/ToothToolbox";
import ViewSwitch from "@/components/ui/ViewSwitch";
import ZoomToolbox from "@/components/ui/ZoomToolbox";
import { sampleUser } from "@/lib/data/sample-responses";
import { E_colorCode } from "@/lib/enums";

export default function Components() {
    return (
        <Layout
            title="Components"
            description="Components"
            contentTitle="Components"
            showBack={true}
            user={sampleUser}
        >
            <LoadingAnimation3d />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                }}
            >
                <PageIcon type="xray" />
                <PageIcon type="scan" />
                <PageIcon type="aligner" />
                <PageIcon type="lab" showComingSoon={true} />
                <PageIcon type="crown" showComingSoon={true} />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                }}
            >
                <ColorIndicator
                    colorCode={E_colorCode.lightBrown}
                    displayType="video"
                />
                <ColorIndicator
                    colorCode={E_colorCode.lightBrown}
                    displayType="number"
                    number={0}
                />
                <ViewSwitch />
                <TabSwitch tabId="overview" onChange={() => {}} />
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    flexFlow: "wrap",
                }}
            >
                <Toolbox2d />
                <ZoomToolbox />
                {/* <OverviewItem
                    item={{
                        classId: "1",
                        label: "Abscess",
                        colorCode: E_colorCode.red,
                        items: [],
                        isHidden: false,
                    }}
                />
                <ListItem />
                <ListItem isSelected={true} /> */}
                <ConditionToolbox />
                {/* <ToothToolbox /> */}
                <ToothSelection />
            </div>
        </Layout>
    );
}
