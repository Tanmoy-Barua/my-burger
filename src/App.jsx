import './App.css';
import {BrowserRouter} from 'react-router-dom'
import Main from './components/Main'
import {Provider} from 'react-redux'
import {store} from './redux/store'


function App() {
  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
        <Main/>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App;
