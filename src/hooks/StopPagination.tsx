import { PropsWithChildren } from "react";
import { View } from "react-native";

export const StopPagination = ({ children }: PropsWithChildren) => {
    
    return (
        <View  onStartShouldSetResponder={()=> true}  onTouchEnd={(e)=> e.stopPropagation()}>
            {children}
        </View>
    )
}