import React from 'react';
import Svg, {Path} from 'react-native-svg';
import { View } from "react-native";
import {Link} from '@react-navigation/native';
import { setAudioPlay } from "../redux/auth-reducer";
import { useDispatch, useSelector } from "react-redux";

function MenuButton(props) {
  const dispatch = useDispatch();
  const audioPlay = useSelector(state => state.Auth.audioPlay);

  return (
    <View style={props.right ? {right: props.right} : {right: 20}}>
      <Link onPress={() => {
        if (audioPlay) {
          dispatch(setAudioPlay(false))
        }
      }} to={{screen: 'AdditionalNavigate'}}>
        <Svg
          width={25}
          height={26}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}>
          <Path
            d="M9.08 0H1.904A1.91 1.91 0 000 1.91v7.206a1.91 1.91 0 001.903 1.91h7.178a1.91 1.91 0 001.903-1.91V1.91A1.91 1.91 0 009.081 0zM23.096 0h-7.178a1.91 1.91 0 00-1.903 1.91v7.206a1.91 1.91 0 001.903 1.91h7.178a1.91 1.91 0 001.903-1.91V1.91A1.91 1.91 0 0023.096 0zM9.08 14.07H1.904C.853 14.07 0 14.925 0 15.98v7.205a1.91 1.91 0 001.903 1.91h7.178a1.91 1.91 0 001.903-1.91V15.98a1.91 1.91 0 00-1.903-1.91zM23.096 14.07h-7.178a1.91 1.91 0 00-1.903 1.91v7.205a1.91 1.91 0 001.903 1.91h7.178a1.91 1.91 0 001.903-1.91V15.98a1.91 1.91 0 00-1.903-1.91z"
            fill="#fff"
          />
        </Svg>
      </Link>
    </View>


  );
}

export default MenuButton;
