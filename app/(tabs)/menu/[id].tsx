import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

import ItemDetail from "@/components/menu/ItemDetail";

const ListItemDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const item = useSelector((state: any) => state.menu.items[id[0]]);

  console.log(id);

  return (
    <View style={{ paddingTop: 60, paddingBottom: 130 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons
            name="chevron-left"
            size={30}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.highlightButton}>
          <MaterialIcons name="star-border" size={20} color="black" />
          <Text>Highlight</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <ItemDetail item={item} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  highlightButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: "#fffece",
    borderRadius: 20,
    marginRight: 10,
  },
  container: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});

export default ListItemDetailScreen;
