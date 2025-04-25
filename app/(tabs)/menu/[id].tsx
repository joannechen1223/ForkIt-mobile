import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import { HighlightButton } from "@/components/menu/Buttons";
import ItemDetail from "@/components/menu/ItemDetail";

const ListDishDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const dish = useSelector((state: any) => state.menu.dishes[id as string]);

  console.log(id);
  console.log(dish);

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
        <HighlightButton dishId={dish.id} />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <ItemDetail dish={dish} />
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
  container: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});

export default ListDishDetailScreen;
