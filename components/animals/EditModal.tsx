import { View, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { COLORS, SPACING, BORDERRADIUS, FONTFAMILY, FONTSIZE } from '@/constants/theme';
import { EditableFields } from '@/constants/types';

interface EditModalProps {
  visible: boolean;
  fields: EditableFields;
  onSave: () => void;
  onClose: () => void;
  onChange: (callback: (prev: { [key: string]: string }) => { [key: string]: string }) => void;
}

const EditModal: React.FC<EditModalProps> = ({ visible, fields, onSave, onClose, onChange }) => (
  <Modal transparent={true} visible={visible} animationType="slide">
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <ThemedText style={styles.modalText}>Edit Details</ThemedText>
        {Object.entries(fields).map(([key, value]) => (
          <TextInput
            key={key}
            style={styles.input}
            placeholder={key}
            value={String(value)}
            onChangeText={(text) => onChange((prev) => ({ ...prev, [key]: text }))}
          />
        ))}
        <TouchableOpacity style={styles.modalButtonSave} onPress={onSave}>
          <ThemedText style={styles.modalButtonText}>Save</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default EditModal;

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
    input: {
        borderBottomWidth: 1,
        borderColor: COLORS.secondaryGreyHex,
        paddingVertical: SPACING.space_8,
        paddingHorizontal: SPACING.space_10,
        fontSize: FONTSIZE.size_16,
        marginBottom: SPACING.space_16,
        color: COLORS.primaryBlackHex,
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