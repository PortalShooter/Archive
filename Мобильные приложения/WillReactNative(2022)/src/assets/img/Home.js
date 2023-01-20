import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';

function Home(props) {
  return (
    <Svg
      width={25}
      height={25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M24.326 10.874l-.002-.002L14.126.674A2.286 2.286 0 0012.498 0c-.614 0-1.192.24-1.627.674L.678 10.867l-.01.01a2.304 2.304 0 00.004 3.25 2.288 2.288 0 001.598.675h.407v7.505A2.697 2.697 0 005.37 25h3.99a.732.732 0 00.732-.732v-5.884a1.23 1.23 0 011.229-1.23h2.353a1.23 1.23 0 011.229 1.23v5.884c0 .404.328.732.732.732h3.99a2.697 2.697 0 002.694-2.693v-7.505h.377c.614 0 1.192-.24 1.627-.675a2.305 2.305 0 00.002-3.253z"
          fill={props.fill}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h25v25H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Home;
