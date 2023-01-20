import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

function Vk(props) {
  return (
    <Svg
      width={43}
      height={43}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M40.26 0H2.746A2.745 2.745 0 000 2.743v37.514A2.745 2.745 0 002.746 43h37.51A2.744 2.744 0 0043 40.257V2.743A2.738 2.738 0 0040.26 0zm-4.591 26.202c.786.8 2.491 2.145 2.182 3.513-.286 1.257-2.16.799-3.981.871-2.079.088-3.31.134-4.561-.87-.589-.477-.935-1.041-1.499-1.672-.513-.57-1.16-1.593-2.04-1.554-1.58.079-1.085 2.282-1.647 3.784-8.787 1.383-12.316-4.045-15.43-9.313-1.508-2.551-3.686-8.032-3.686-8.032l6.214-.02s1.994 3.625 2.522 4.56c.449.795.943 1.426 1.453 2.136.428.589 1.105 1.742 1.845 1.648 1.205-.155 1.423-4.828.677-6.394-.298-.634-1.01-.855-1.748-1.07.249-1.573 6.97-1.9 8.056-.68 1.578 1.771-1.092 6.705 1.068 8.144 3.035-1.59 5.626-8.248 5.626-8.248l7.276.046s-1.138 3.599-2.33 5.195c-.695.934-3.001 3.016-2.91 4.56.073 1.223 1.948 2.413 2.913 3.396z"
          fill="#4D76A1"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h43v43H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Vk;
