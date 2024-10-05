import './App.css'
import useRouteElement from './routes/useRouteElement';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  const routeElement = useRouteElement();

  return (
    <>
      <ScrollToTop />
      {routeElement}
    </>
  )
}

export default App
