import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useEffect } from "react";
import SlimToggleSwitch from "../ToggleSwitch/slimToggleSwitch";
import DotMenu from "./dotMenu";

const PreparationCard = ({
  isDisabled,
  routineName,
  count,
  startTime,
  totalTime,
  isModify,
  id,
  setActiveModalId,
  activeModalId,
}) => {
  const getTextColorStyle = () => ({
    color: isDisabled ? "#969696" : "#1B1B1B",
  });
  const getBackgoundColorStyle = () => ({
    backgroundColor: isModify ? "#E1E1E1" : "#fff",
  });

  const handleMenuClick = () => {
    setActiveModalId(id);
  };

  useEffect(() => {
    if (activeModalId !== id) {
    }
  }, [activeModalId]);

  const optionModalRef = useRef < View > null;
  const handlePressOutside = () => {
    if (optionModalRef.current) {
      setActiveModalId("");
    }
  };

  const handleDeleteClick = () => {
    console.log("delete", id);
  };

  const handleCopyClick = () => {
    console.log("copy", id);
  };

  console.log("id", id);
  console.log("activeModalId", activeModalId);

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <View>
        <View style={[styles.card, getBackgoundColorStyle()]}>
          <View style={styles.row}>
            <View>
              <View style={styles.titleRow}>
                <Text style={[styles.titleText, getTextColorStyle()]}>
                  {routineName}
                </Text>
                <Text style={[styles.text, getTextColorStyle()]}>|</Text>
                <Text style={[styles.text, getTextColorStyle()]}>
                  {count}개
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.subText, getTextColorStyle()]}>
                  시작 시간: {startTime}
                </Text>
                <Text style={[styles.subText, getTextColorStyle()]}>
                  총 소요 시간: {totalTime}
                </Text>
              </View>
            </View>
            <View style={styles.rightColumn}>
              <View>
                <SlimToggleSwitch
                  isEnable={isDisabled}
                  onClick={() => {}}
                  id={1}
                />
              </View>
              <DotMenu
                onPress={handleMenuClick}
                onCopy={handleCopyClick}
                onDelete={handleDeleteClick}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: "#4B4B4B",
    borderStyle: "solid",
    padding: 16,
    borderRadius: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  detailRow: {
    flexDirection: "column",
  },
  rightColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "700",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  subText: {
    fontSize: 14,
    fontWeight: "400",
  },
  icon: {
    width: 24,
    height: 24,
    alignSelf: "center",
  },
});

export default PreparationCard;
