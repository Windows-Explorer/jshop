import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import CButton from './components/c-button.component'
import AuthentificationScreen from './screens/auth.screen'
import DataSource from './services/data-source'


function App(): JSX.Element {

  // const dataSource = new DataSource()
  // dataSource.getData()

  return (
    <SafeAreaView>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <AuthentificationScreen />
    </SafeAreaView>
  )
}
 
export default App
