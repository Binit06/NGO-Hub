import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface ButtonProps {
    label: string;
    main?: () => void;
}

const Button: React.FC<ButtonProps> = ({
    label,
    main
}) => {
  return (
    <TouchableOpacity style={{borderRadius: 17, backgroundColor: 'rgba(25, 25, 25, 1)', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 7, marginTop: 7, gap: 10, paddingHorizontal: 7}} onPress={main}>
        <Text style={{color: 'rgba(0,0,0,0.5)', fontWeight: 'bold'}}>
            {label}
        </Text>
    </TouchableOpacity>
  )
}

export default Button