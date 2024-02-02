import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  children?: React.ReactNode;
  snappoints: string[];
  index: number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onChange, children, snappoints, index }) => {
  const snapPoints = useMemo(() => snappoints, []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Function to handle opening the modal
  const handleOpen = () => {
    bottomSheetRef.current?.expand();
  };
  const handleClose = () => {
    bottomSheetRef.current?.close();
  };

  // Call handleOpen when the modal is initially opened
  if (isOpen) {
    handleOpen();
  } else {
    handleClose()
  }

  const [open, setOpen] = useState(isOpen)
  const [position, setPosition] = useState(0)
  return (
    <SafeAreaView style={styles.modalContainer}>
      {/* Render backdrop only when the modal is open */}
      {isOpen && (
        <Pressable style={styles.backdrop} onPress={() => onChange(false)}>
          <Pressable>
            <Text style={styles.closeText}></Text>
          </Pressable>
        </Pressable>
      )}

      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        index={index}
        enablePanDownToClose={false}
        handleIndicatorStyle={{ backgroundColor: "rgb(120,120,120)", width: 100, height: 10 }}
        backgroundStyle={{ backgroundColor: "white" }}
        style={{flex: 1}}
      >
        {children}
      </BottomSheet>
      {/* <Sheet
      forceRemoveScrollEnabled={open}
      modal={true}
      open={isOpen}
      onOpenChange={setOpen}
      snapPoints={snapPoints}
      snapPointsMode="percent"
      dismissOnSnapToBottom
      position={position}
      onPositionChange={setPosition}
      zIndex={100_000}
      animation={"medium"}
      >
        <Sheet.Overlay 
        animation={"lazy"}
        enterStyle={{opacity: 0}}
        exitStyle={{opacity: 0}}
        />
        <Sheet.Handle />
        <Sheet.Frame padding="$4" justifyContent="center" alignItems="center" space="$5">
          {children}
        </Sheet.Frame>
      </Sheet> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    height: '100%',
    width: '100%'
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    color: "white",
  },
});

export default Modal;
