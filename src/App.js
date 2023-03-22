import './App.css';
import Cards from './components/characters/Сharacters';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import ScrollToTop from './components/scroll/ScrollToTop';

function App() {
  return (
    <>
    <Header/>
        <Cards />
      <ScrollToTop />
      <Footer/>
    </>
  );
}
export default App;
