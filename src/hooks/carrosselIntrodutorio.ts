import { useState, useRef } from "react";
import { ViewToken } from "react-native";

export function useCarrossel(){
    const [imagemAtiva, setImagemAtiva] = useState(0)

    const itemVisivelMudando = useRef(({viewableItems}: {viewableItems: ViewToken[]}) =>{
        if(viewableItems.length > 0 && viewableItems[0].index !==null){
            setImagemAtiva(viewableItems[0].index);
        }
    }).current

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current

    return {
        imagemAtiva,
        itemVisivelMudando,
        viewabilityConfig
    }
}