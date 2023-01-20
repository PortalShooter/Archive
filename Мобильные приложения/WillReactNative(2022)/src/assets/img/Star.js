import * as React from "react"
import Svg, {ClipPath, Defs, G, Path} from "react-native-svg";

function Star(props) {
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
                    d="M24.934 9.589a1.327 1.327 0 00-1.142-.913l-7.217-.655-2.852-6.677a1.33 1.33 0 00-2.445 0L8.426 8.02l-7.218.655a1.331 1.331 0 00-.755 2.325l5.455 4.784L4.3 22.869a1.328 1.328 0 001.977 1.437l6.223-3.721 6.222 3.72A1.328 1.328 0 0020.7 22.87l-1.608-7.084L24.547 11c.4-.35.552-.905.387-1.412z"
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

export default Star