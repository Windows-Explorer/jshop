import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import AnimatedButton from './components/animated-button.component'
import AuthentificationScreen from './screens/auth.screen'


function App(): JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />

      <AnimatedButton />
      
    </SafeAreaView>
  )
}
 
export default App
