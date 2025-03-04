import { View } from "react-native";
import { useSelector } from "react-redux";

import { RootState } from "@/app/store";
import TopBar from "@/components/menu/TopBar";
import { MenuType } from "@/features/Menu/constants";

import ChatScreen from "./chat";
import ListScreen from "./list";
import PicScreen from "./pic";

export default function TabCameraScreen() {
  const menuType = useSelector((state: RootState) => state.menu.menuType);

  return (
    <View style={{ flex: 1 }}>
      <TopBar menuType={menuType} />
      <View style={{ flex: 1, marginTop: 60 }}>
        {menuType === MenuType.List && <ListScreen />}
        {menuType === MenuType.Ask && <ChatScreen />}
        {menuType === MenuType.Pic && <PicScreen />}
      </View>
    </View>
  );
}
