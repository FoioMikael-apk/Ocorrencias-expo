import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  titulo: {
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  botaoNova: {
    marginBottom: 20,
    borderRadius: 10,
  },
  card: {
    marginBottom: 15,
    borderRadius: 12,
    elevation: 2,
    padding: 10,
    backgroundColor: "#fff",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  foto: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  descricao: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  botaoDetalhes: {
    marginTop: 10,
    alignSelf: "flex-start",
  },
});
