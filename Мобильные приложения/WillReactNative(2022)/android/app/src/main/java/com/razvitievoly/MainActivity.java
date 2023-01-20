package com.razvitievoly;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

//react-native-orientation
import android.content.Intent;
import android.content.res.Configuration;


// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ReactNativeWill";
  }

//   @Override
//   protected void onCreate(Bundle savedInstanceState) {
//     super.onCreate(null);
//   }

//react-native-orientation
 @Override
      public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
  }
}
