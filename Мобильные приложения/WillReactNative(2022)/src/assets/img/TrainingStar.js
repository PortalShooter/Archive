import * as React from "react"
import Svg, { Path } from "react-native-svg"

const TrainingStar = (props) => (
  <Svg
    width={28}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m14 1.618 2.668 8.21.112.346H25.776l-6.984 5.074-.294.213.112.346 2.668 8.21-6.984-5.074L14 18.73l-.294.213-6.984 5.074 2.668-8.21.112-.346-.294-.213-6.984-5.074H11.22l.112-.346L14 1.618Z"
      fill="#FFC107"
      stroke="#000"
    />
  </Svg>
)

export default TrainingStar
