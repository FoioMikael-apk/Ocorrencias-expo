import React from "react";
import { ScrollView, View, Image, Alert } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { Text, Button, Divider } from "react-native-paper";
import { Ocorrencia } from "../types/Ocorrencia";
import { api } from "../services/api";
import Toast from "react-native-toast-message";
import VoltarButton from "../components/VoltarButton";
import * as WebBrowser from "expo-web-browser";
import { styles } from "./DetalhesOcorrenciaScreen.styles";

type RouteParams = {
  DetalhesOcorrencia: {
    ocorrencia: Ocorrencia;
  };
};

export default function DetalhesOcorrenciaScreen() {
  const route = useRoute<RouteProp<RouteParams, "DetalhesOcorrencia">>();
  const navigation = useNavigation<any>();
  const { ocorrencia } = route.params;

  const handleExcluir = () => {
    Alert.alert(
      "Excluir Ocorrência",
      "Tem certeza que deseja excluir esta ocorrência?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/ocorrencias/${ocorrencia.id}`);
              Toast.show({
                type: "success",
                text1: "Ocorrência excluída",
              });
              navigation.goBack();
            } catch (err) {
              Toast.show({
                type: "error",
                text1: "Erro ao excluir",
              });
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <VoltarButton />

      <Text variant="headlineMedium" style={styles.titulo}>
        📋 Detalhes da Ocorrência
      </Text>

      {ocorrencia.imagem && (
        <View style={styles.perfilContainer}>
          <Image
            source={{ uri: `http://192.168.0.35:3333/uploads/${ocorrencia.imagem}` }}
            style={styles.perfil}
          />
          <Text style={styles.perfilLegenda}>Foto do suspeito</Text>
        </View>
      )}

      {[
        ["📝 Descrição", ocorrencia.descricao],
        ["📍 Local", ocorrencia.local],
        ["🛡️ Status", ocorrencia.status],
        ["🧍 Idade", ocorrencia.idade?.toString() ?? "-"],
        ["⚧ Sexo", ocorrencia.sexo ?? "-"],
        ["📦 Produto", ocorrencia.produto ?? "-"],
        ["💰 Preço", ocorrencia.preco ? `R$ ${Number(ocorrencia.preco).toFixed(2)}` : "-"],
        ["🏬 Setor", ocorrencia.setor ?? "-"],
        ["📝 Observação", ocorrencia.observacao ?? "-"],
        ["📅 Data", new Date(ocorrencia.created_at).toLocaleString()],
      ].map(([label, value], index) => (
        <View key={index} style={styles.item}>
          <Text variant="titleSmall" style={styles.label}>{label}</Text>
          <Text>{value}</Text>
          <Divider style={styles.divider} />
        </View>
      ))}

      <View style={styles.botoes}>
        <Button mode="contained" onPress={handleExcluir} buttonColor="#d32f2f">
          🗑️ Excluir Ocorrência
        </Button>
      </View>

      <View style={styles.exportacoes}>
        <Button
          icon="file-pdf"
          mode="outlined"
          onPress={() => WebBrowser.openBrowserAsync("http://192.168.0.35:3333/ocorrencias/export/pdf")}
          style={styles.botaoExportar}
        >
          Exportar PDF
        </Button>
        <Button
          icon="file-excel"
          mode="outlined"
          onPress={() => WebBrowser.openBrowserAsync("http://192.168.0.35:3333/ocorrencias/export/excel")}
          style={styles.botaoExportar}
        >
          Exportar Excel
        </Button>
      </View>
    </ScrollView>
  );
}
