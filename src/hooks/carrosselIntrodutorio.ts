import { useState, useRef, useCallback } from "react";
import { ViewToken } from "react-native";

export function useCarrossel(){
    const [imagemAtiva, setImagemAtiva] = useState(0)

    const itemVisivelMudando = useCallback(({viewableItems}: {viewableItems: ViewToken[]}) =>{
        if(viewableItems.length > 0 && viewableItems[0].index !==null){
            setImagemAtiva(viewableItems[0].index);
        }
    }, [])

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
        minimunViewTime: 10
    }).current

    return {
        imagemAtiva,
        itemVisivelMudando,
        viewabilityConfig
    }
}