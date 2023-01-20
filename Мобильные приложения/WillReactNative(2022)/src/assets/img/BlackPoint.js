import * as React from "react"
import Svg, { Circle } from "react-native-svg"

const BlackPoint = (props) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={9} cy={9} r={9} fill="#000" />
  </Svg>
)

export default BlackPoint
