import { useEffect, useState } from "react"
import { View } from "../components/Themed"
import BottomModel from "../components/BootmModel"
import PostModel from "../components/PostModel"
import DeatilsModel from "../components/DetailsModel"

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted){
        return null
    }

    return(
        <>
        <BottomModel />
        <PostModel />
        <DeatilsModel />
        </>
    )
}

export default ModalProvider