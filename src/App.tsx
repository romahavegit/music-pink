import { Provider } from "react-redux";
import { Header } from "сomponents/Header/Header";
import { Menu } from "сomponents/Menu/Undeterminated";
import { Root } from "сomponents/Root/Root";
import { TrackDescription } from "сomponents/TrackDescription/Undeterminated";
import { store } from "store";
const App = ()=>(
  <Provider store = {store}>
    <Root>
      <>
        <Header/>
        <Menu/>
        <TrackDescription/>
      </>
    </Root>
  </Provider>
)

export default App;