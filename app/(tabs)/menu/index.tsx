import { View } from "react-native";
import { useSelector } from "react-redux";

import { RootState } from "@/app/store";
import AskView from "@/components/menu/AskView";
import PicView from "@/components/menu/PicView";
import TopBar from "@/components/menu/TopBar";
import { MenuType } from "@/features/Menu/constants";

import ListScreen from "./list";

export default function TabCameraScreen() {
  const menuType = useSelector((state: RootState) => state.menu.menuType);

  return (
    <View style={{ flex: 1 }}>
      <TopBar menuType={menuType} />
      <View style={{ flex: 1, marginTop: 60 }}>
        {menuType === MenuType.List && <ListScreen />}
        {menuType === MenuType.Ask && <AskView />}
        {menuType === MenuType.Pic && <PicView />}
      </View>
    </View>
  );
}
