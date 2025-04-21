import React, { useEffect, useState } from "react";
import { View, ScrollView, RefreshControl, Image } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import { Ocorrencia } from "../types/Ocorrencia";
import { styles } from "./HomeScreen.styles";

export default function HomeScreen() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<any>();

  const carregar = async () => {
    try {
      const response = await api.get("/ocorrencias");
      setOcorrencias(response.data);
    } catch (err) {
      console.error("Erro ao carregar ocorrências:", err);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await carregar();
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View>
        <Text variant="headlineMedium" style={styles.titulo}>
          📋 Ocorrências Registradas
        </Text>

        <Button
          mode="contained"
          onPress={() => navigation.navigate("NovaOcorrencia")}
          style={styles.botaoNova}
        >
          ➕ Nova Ocorrência
        </Button>

        {ocorrencias.map((oc) => (
          <Card key={oc.id} style={styles.card}>
            <View style={styles.cardContent}>
              {oc.imagem && (
                <Image
                  source={{ uri: `http://192.168.0.35:3333/uploads/${oc.imagem}` }}
                  style={styles.foto}
                />
              )}
              <View style={styles.info}>
                <Text variant="titleMedium" style={styles.descricao}>
                  {oc.descricao}
                </Text>
                <Text>📍 {oc.local}</Text>
                <Text>🛡️ {oc.status}</Text>
                <Text>📅 {new Date(oc.created_at).toLocaleDateString()}</Text>

                <Button
                  mode="outlined"
                  onPress={() =>
                    navigation.navigate("DetalhesOcorrencia", { ocorrencia: oc })
                  }
                  style={styles.botaoDetalhes}
                >
                  Ver Detalhes
                </Button>
              </View>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}
