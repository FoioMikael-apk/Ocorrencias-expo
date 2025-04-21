import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 60,
  },
  titulo: {
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  perfilContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  perfil: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#1976d2",
    marginBottom: 8,
  },
  perfilLegenda: {
    fontSize: 12,
    color: "#555",
  },
  item: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 2,
  },
  divider: {
    marginTop: 8,
  },
  botoes: {
    marginTop: 20,
    marginBottom: 20,
  },
  exportacoes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  botaoExportar: {
    flex: 1,
    minWidth: 150,
  },
});
