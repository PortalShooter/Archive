import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function AddNotes(props) {
  return (
    <Svg
      width={17}
      height={17}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M8.5 0C3.813 0 0 3.813 0 8.5 0 13.187 3.813 17 8.5 17c4.687 0 8.5-3.813 8.5-8.5C17 3.813 13.187 0 8.5 0zm0 15.683c-3.96 0-7.183-3.222-7.183-7.183S4.54 1.317 8.5 1.317s7.183 3.222 7.183 7.183A7.191 7.191 0 018.5 15.683z"
        fill="#05B9F0"
      />
      <Path
        d="M11.792 7.782H9.158V5.15a.658.658 0 10-1.316 0v2.633H5.208a.658.658 0 100 1.317h2.634v2.634a.658.658 0 101.316 0V9.099h2.634a.658.658 0 100-1.317z"
        fill="#05B9F0"
      />
    </Svg>
  );
}

export default AddNotes;
