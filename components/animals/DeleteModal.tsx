import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { COLORS, SPACING, BORDERRADIUS, FONTSIZE, FONTFAMILY } from '@/constants/theme';

interface DeleteModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isVisible, onConfirm, onClose }) => (
  <Modal transparent={true} visible={isVisible} animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <ThemedText style={styles.modalText}>Are you sure you want to delete this animal?</ThemedText>
        <View style={styles.modalButtons}>
          <TouchableOpacity style={styles.modalButtonCancel} onPress={onClose}>
            <ThemedText style={styles.modalButtonText}>Cancel</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButtonDelete} onPress={onConfirm}>
            <ThemedText style={styles.modalButtonText}>Delete</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default DeleteModal;

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: COLORS.primaryWhiteHex,
      padding: SPACING.space_20,
      borderRadius: BORDERRADIUS.radius_10,
      width: '80%',
      alignItems: 'center',
    },
    modalText: {
      fontSize: FONTSIZE.size_18,
      color: COLORS.primaryBlackHex,
      textAlign: 'center',
      marginBottom: SPACING.space_20,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    modalButtonCancel: {
      backgroundColor: COLORS.secondaryGreyHex,
      borderRadius: BORDERRADIUS.radius_8,
      paddingVertical: SPACING.space_12,
      paddingHorizontal: SPACING.space_20,
      marginRight: SPACING.space_10,
    },
    modalButtonDelete: {
      backgroundColor: COLORS.primaryRedHex,
      borderRadius: BORDERRADIUS.radius_8,
      paddingVertical: SPACING.space_12,
      paddingHorizontal: SPACING.space_20,
    },
    modalButtonSave: {
      backgroundColor: COLORS.primaryBlueHex,
      borderRadius: BORDERRADIUS.radius_8,
      paddingVertical: SPACING.space_12,
      paddingHorizontal: SPACING.space_20,
    },
    modalButtonText: {
      fontSize: FONTSIZE.size_16,
      color: COLORS.primaryWhiteHex,
      fontFamily: FONTFAMILY.poppins_medium,
      textAlign: 'center',
    },
  });
