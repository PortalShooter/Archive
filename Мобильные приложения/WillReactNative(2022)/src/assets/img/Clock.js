import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function Clock(props) {
    return (
        <Svg
            width={22}
            height={22}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G clipPath="url(#prefix__clip0)" fill="#fff">
                <Path d="M19.685 5.789a.916.916 0 00-.426 1.224A9.074 9.074 0 0120.167 11c0 5.054-4.113 9.167-9.167 9.167-5.054 0-9.167-4.113-9.167-9.167 0-5.054 4.113-9.167 9.167-9.167 2.095 0 4.062.684 5.69 1.978a.916.916 0 101.141-1.435A11.018 11.018 0 0011 0C4.935 0 0 4.935 0 11s4.935 11 11 11 11-4.935 11-11c0-1.68-.367-3.291-1.09-4.785a.916.916 0 00-1.225-.426z" />
                <Path d="M11 3.667a.917.917 0 00-.917.916V11c0 .506.411.917.917.917h4.583a.917.917 0 000-1.834h-3.666v-5.5A.917.917 0 0011 3.667z" />
            </G>
            <Defs>
                <ClipPath id="prefix__clip0">
                    <Path fill="#fff" d="M0 0h22v22H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default Clock
