import React from "react";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function VoltarButton() {
  const navigation = useNavigation<any>();
  const theme = useTheme();

  return (
    <View style={{ marginBottom: 16 }}>
      <Button
        mode="outlined"
        icon="arrow-left"
        onPress={() => navigation.goBack()}
        textColor={theme.colors.primary}
      >
        Voltar
      </Button>
    </View>
  );
}
