import * as React from "react"
import Svg, {ClipPath, Defs, G, Path} from "react-native-svg";

function Statistical(props) {
    return (
        <Svg
            width={25}
            height={25}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G clipPath="url(#prefix__clip0)" fill={props.fill}>
                <Path d="M6.08 11.685H.815A.815.815 0 000 12.5v10.53c0 .45.365.815.815.815H6.08c.45 0 .815-.365.815-.815V12.5a.815.815 0 00-.815-.815zM15.132 1.155H9.868a.815.815 0 00-.816.815v21.06c0 .45.365.815.816.815h5.264c.45 0 .816-.365.816-.815V1.97a.815.815 0 00-.816-.815zM24.185 6.42H18.92a.815.815 0 00-.815.815V23.03c0 .45.365.815.815.815h5.265c.45 0 .815-.365.815-.815V7.235a.815.815 0 00-.815-.815z" />
            </G>
            <Defs>
                <ClipPath id="prefix__clip0">
                    <Path fill="#fff" d="M0 0h25v25H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default Statistical