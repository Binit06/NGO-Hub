import React, { Children, useState } from "react";
import usePostModelStore from "../hooks/usePostModal"
import Modal from "./BottomModal";
import { View } from "./Themed";
import { Pressable, Text } from "react-native";
import { Link } from "expo-router";
import useDetailsModelStore from "../hooks/useDetailsModel";


const DeatilsModel = () => {
    const detailsModel = useDetailsModelStore()

    const {onClose, isOpen, children} = useDetailsModelStore()

    const onChange = (open: boolean) => {
        if(!open){
            onClose()
        }
    }

    const [snappoint, setSnapPoint] = useState("50%")

    return (
        <Modal
        isOpen={isOpen}
        onChange={onChange}
        snappoints={["45%"]}
        index={-1}
        >
            {children}
        </Modal>
    )
}

export default DeatilsModel