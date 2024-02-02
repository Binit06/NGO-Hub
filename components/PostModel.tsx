import { useState } from "react";
import usePostModelStore from "../hooks/usePostModal"
import Modal from "./BottomModal";
import { View } from "./Themed";
import { Pressable, Text } from "react-native";
import { Link } from "expo-router";

const PostModel = () => {
    const postmodel = usePostModelStore();

    const {onClose, isOpen} = usePostModelStore()

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
        snappoints={["50%", "85%"]}
        index={-1}
        >
            <Link href={'/(tabs)'} asChild>
            <Pressable>
                <Text>Hi</Text>
            </Pressable>
            </Link>
        </Modal>
    )
}

export default PostModel