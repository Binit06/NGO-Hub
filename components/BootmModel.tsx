import useBottomModalStore from "../hooks/useBottomSheetModal"
import Modal from "./BottomModal"
import { useState } from "react"

const BottomModel = () => {
    const model = useBottomModalStore()

    const {onClose, isOpen, children} = useBottomModalStore()

    const onChange = (open: boolean) => {
        if(!open){
            onClose()
        }
    }

    const [snappoint, setSnapPoint] = useState("20%")

    return (
        <Modal
        isOpen={isOpen}
        onChange={onChange}
        snappoints={["25%"]}
        index={-1}
        >
            {children}
        </Modal>
    )
}

export default BottomModel