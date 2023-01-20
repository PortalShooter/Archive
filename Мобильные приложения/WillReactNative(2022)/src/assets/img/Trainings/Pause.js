import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function Pause(props) {
  return (
    <Svg
      width={30}
      height={30}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15 30c-4.007 0-7.774-1.56-10.607-4.393A14.902 14.902 0 010 15c0-4.007 1.56-7.774 4.393-10.607A14.902 14.902 0 0115 0c4.007 0 7.773 1.56 10.607 4.393A14.902 14.902 0 0130 15c0 4.007-1.56 7.773-4.393 10.607A14.902 14.902 0 0115 30zm0-27.656C8.021 2.344 2.344 8.02 2.344 15c0 6.979 5.677 12.656 12.656 12.656 6.979 0 12.656-5.677 12.656-12.656C27.656 8.021 21.98 2.344 15 2.344zm-1.758 6.152h-2.344v12.89h2.344V8.497zm5.86 0h-2.344v12.89h2.344V8.497z"
        fill="url(#prefix__paint0_linear_296:1068)"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear_296:1068"
          x1={15}
          y1={0}
          x2={15}
          y2={30}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2AF598" />
          <Stop offset={1} stopColor="#009EFD" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default Pause
