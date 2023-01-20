import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function DeleteNotes(props) {
  return (
    <Svg
      width={11}
      height={11}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M4.681 5.499L.17 10.011a.579.579 0 10.818.818L5.5 6.318l4.512 4.511a.579.579 0 10.818-.818L6.32 5.499 10.83.987a.579.579 0 00-.818-.818L5.5 4.68.988.17A.579.579 0 00.17.987L4.68 5.5z"
        fill="#C5C5C5"
      />
    </Svg>
  );
}

export default DeleteNotes;
