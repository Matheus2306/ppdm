import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

const SensorCard = (props) => {
  const theme = useTheme();

  // tipo: "temperature" ou "humidity" (default: temperature)
  const variant = props.type === "humidity" ? "humidity" : "temperature";
  const colors =
    variant === "humidity"
      ? { accent: "#0277BD", track: "rgba(2, 119, 189, 0.15)" }
      : { accent: "#E65100", track: "rgba(230, 81, 0, 0.15)" };

  const styles = createStyles(theme, colors);

  const rangeMin =
    typeof props.rangeMin === "number"
      ? props.rangeMin
      : variant === "humidity"
      ? 0
      : 0;
  const rangeMax =
    typeof props.rangeMax === "number"
      ? props.rangeMax
      : variant === "humidity"
      ? 100
      : 50;

  const valueNum = typeof props.value === "number" ? props.value : null;
  const clamped =
    valueNum === null
      ? rangeMin
      : Math.max(rangeMin, Math.min(rangeMax, valueNum));
  const progress =
    rangeMax > rangeMin
      ? ((clamped - rangeMin) / (rangeMax - rangeMin)) * 100
      : 0;

  return (
    <View style={[styles.card, { borderLeftColor: colors.accent }]}>
      <View style={styles.cardHeader}>
        <View style={[styles.icon, { backgroundColor: colors.track, borderColor: colors.accent }]}>
          <Text style={[styles.iconText, { color: colors.accent }]}>{props.icon}</Text>
        </View>
        <Text style={styles.cardTitle}>{props.title}</Text>
      </View>
      <View style={styles.valueDisplay}>
        <Text style={[styles.value, { color: colors.accent }]}>
          {valueNum !== null ? valueNum.toFixed(1) : "--"}
        </Text>
        <Text style={styles.unit}>{props.unit}</Text>
      </View>
      <View style={[styles.progressBar, { backgroundColor: colors.track }]}>
        <View style={[styles.progressFill, { backgroundColor: colors.accent, width: `${progress}%` }]} />
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Mínima</Text>
          <Text style={styles.statValue}>
            {props.min !== null
              ? `${props.min.toFixed(1)}${props.unit}`
              : `--${props.unit}`}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Máxima</Text>
          <Text style={styles.statValue}>
            {props.max !== null
              ? `${props.max.toFixed(1)}${props.unit}`
              : `--${props.unit}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme, colors) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.card || "#fff",
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
      // destaque por tipo
      borderLeftWidth: 6,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    icon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
      borderWidth: 1,
    },
    iconText: {
      fontSize: 18,
      fontWeight: "600",
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.text,
    },
    valueDisplay: {
      flexDirection: "row",
      alignItems: "flex-end",
      marginBottom: 10,
    },
    value: {
      fontSize: 36,
      fontWeight: "800",
    },
    unit: {
      marginLeft: 6,
      fontSize: 16,
      color: theme.mutedText || "#666",
      marginBottom: 6,
    },
    progressBar: {
      height: 8,
      borderRadius: 6,
      overflow: "hidden",
      marginBottom: 10,
    },
    progressFill: {
      height: "100%",
      borderRadius: 6,
    },
    stats: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 4,
    },
    stat: {
      flexDirection: "column",
    },
    statLabel: {
      fontSize: 12,
      color: theme.mutedText || "#666",
    },
    statValue: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text || "#222",
    },
  });

export default memo(SensorCard);
