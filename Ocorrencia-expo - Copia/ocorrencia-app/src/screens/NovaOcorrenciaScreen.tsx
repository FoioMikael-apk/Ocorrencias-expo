import React, { useState } from "react";
import { View, Image } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { api } from "../services/api";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { styles } from "./NovaOcorrenciaScreen.styles";
import VoltarButton from "../components/VoltarButton";

export default function NovaOcorrenciaScreen() {
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [status, setStatus] = useState("");
  const [imagem, setImagem] = useState<any>(null);
  const navigation = useNavigation<any>();

  const escolherImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImagem(result.assets[0]);
    }
  };

  const handleEnviar = async () => {
    if (!descricao || !local || !status || !imagem) {
      Toast.show({
        type: "error",
        text1: "Preencha todos os campos!",
      });
      return;
    }

    const form = new FormData();
    form.append("descricao", descricao);
    form.append("local", local);
    form.append("status", status);

    const fileName = imagem.uri.split("/").pop() || "foto.jpg";
    const fileType = imagem.mimeType || "image/jpeg";

    form.append("imagem", {
      uri: imagem.uri,
      name: fileName,
      type: fileType,
    } as any);

    try {
      await api.post("/ocorrencias", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Toast.show({
        type: "success",
        text1: "Ocorrência salva com sucesso!",
      });

      navigation.goBack();
    } catch (err) {
      console.error(err);
      Toast.show({
        type: "error",
        text1: "Erro ao salvar ocorrência.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <VoltarButton />
      <Text variant="titleLarge" style={styles.titulo}>📝 Nova Ocorrência</Text>

      <TextInput
        label="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />
      <TextInput
        label="Local"
        value={local}
        onChangeText={setLocal}
        style={styles.input}
      />
      <TextInput
        label="Status (pendente ou concluída)"
        value={status}
        onChangeText={setStatus}
        style={styles.input}
      />

      <Button mode="outlined" onPress={escolherImagem} style={styles.input}>
        Selecionar Foto
      </Button>

      {imagem && (
        <Image
          source={{ uri: imagem.uri }}
          style={styles.imagem}
        />
      )}

      <Button mode="contained" onPress={handleEnviar} style={styles.botao}>
        Salvar Ocorrência
      </Button>
    </View>
  );
}
