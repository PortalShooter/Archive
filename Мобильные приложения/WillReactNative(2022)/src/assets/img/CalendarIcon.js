import * as React from "react"
import Svg, {ClipPath, Defs, G, Path} from "react-native-svg";

function CalendarIcon(props) {
    return (
        <Svg
            width={25}
            height={25}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G clipPath="url(#prefix__clip0)">
                <Path
                    d="M21.875 3.125h-1.042V1.042C20.833.467 20.367 0 19.792 0H18.75c-.575 0-1.042.467-1.042 1.042v2.083H7.292V1.042C7.292.467 6.825 0 6.25 0H5.208c-.575 0-1.041.467-1.041 1.042v2.083H3.125A3.129 3.129 0 000 6.25v15.625A3.129 3.129 0 003.125 25h18.75A3.129 3.129 0 0025 21.875V6.25a3.129 3.129 0 00-3.125-3.125zm1.042 18.75c0 .574-.468 1.042-1.042 1.042H3.125a1.043 1.043 0 01-1.042-1.042V10.458h20.834v11.417z"
                    fill={props.fill}
                />
            </G>
            <Defs>
                <ClipPath id="prefix__clip0">
                    <Path fill="#fff" d="M0 0h25v25H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default CalendarIcon