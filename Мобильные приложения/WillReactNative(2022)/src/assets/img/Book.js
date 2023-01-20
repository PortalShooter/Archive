import * as React from "react"
import Svg, {Path} from "react-native-svg";

function Book(props) {
    return (
        <Svg
            width={25}
            height={25}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M5.264 2.083h17.669V0H5.225A3.132 3.132 0 002.1 3.112v18.763A3.134 3.134 0 005.225 25H21.89c.573 0 1.042-.469 1.042-1.042V4.167h-5.208v4.987c0 .455-.573.69-.886.364l-1.198-1.185-1.198 1.198a.52.52 0 01-.885-.364v-5H5.225a1.045 1.045 0 01-1.042-1.042V3.06c.052-.56.52-.99 1.08-.977zm3.086 12.5h8.333v2.084H8.35v-2.084zm0 4.167h8.333v2.083H8.35V18.75z"
                fill={props.fill}
            />
        </Svg>
    )
}

export default Book