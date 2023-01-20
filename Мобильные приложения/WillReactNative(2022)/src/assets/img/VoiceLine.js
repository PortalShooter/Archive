import * as React from 'react';
import Svg, {ClipPath, Defs, Path, Rect} from 'react-native-svg';

function VoiceLine(props) {
  return (
    <Svg
      width={224}
      height={35}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        stroke="#05B9F0"
        strokeWidth={2}
        d="M1 33.704V4.921M9.299 27.222V11.667M17.599 27.222V11.667M27.973 31.112V5.186M36.271 35V2.593M44.57 25.926V10.37M52.869 24.63V11.667M61.168 23.334V12.963M69.467 25.926V11.667M75.692 27.222V9.074M83.99 28.519V7.778M92.29 23.334V12.963M98.514 23.334V12.963M106.813 23.334V12.963M117.187 31.112V2.329M125.486 24.63V9.074M133.785 24.63V9.074M144.159 28.519V2.593M152.458 32.407V0M160.757 23.334V7.778M169.056 22.037V9.074M177.355 20.741v-10.37M185.655 23.334V9.074M191.879 24.63V6.481M200.177 25.926V5.185M208.477 20.741v-10.37M214.701 20.741v-10.37M223 20.741v-10.37"
      />
      <Defs>
        <ClipPath>
          <Rect x={0} y={0} width={224} height={35} />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default VoiceLine;
