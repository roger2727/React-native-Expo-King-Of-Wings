import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  View,
  Text,
} from "react-native";
import helpLogo from "../../../assets/question.png";
import { colors } from "../../utils/colors";

export function HelpLogoWithModal({ modalContent }) {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
 
    setModalVisible(true);
  };
  const closeModal = () => setModalVisible(false);

  return (
    <View>
      <TouchableOpacity style={styles.helpLogoContainer} onPress={openModal}>
        <Image style={styles.helpLogo} source={helpLogo} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            {modalContent}
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <Text>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  helpLogoContainer: {
    display: "flex",
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  helpLogo: {
    zIndex: 2,
    width: 40,
    height: "100%",
    resizeMode: "contain",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 50,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: colors.accent,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
