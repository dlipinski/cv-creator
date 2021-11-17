import { Card, Pane, SegmentedControl } from 'evergreen-ui';
import classes from './App.module.css';
import Form from './components/Form/Form';
import Header from './components/Header/Header';
import Page from './components/Page/Page';


function App() {


  return (
    <Pane width='100vw' height='100vh' display='grid' gridTemplateRows='auto 1fr' overflow='hidden' background='white'>
      <Header />
      <Pane display='grid' gridTemplateColumns='1fr auto' overflow='hidden'>
        <div className={classes.FormContainer}>
          <Form />
        </div>
        <div className={classes.PageContainer}>
          <Page />
        </div>
      </Pane>
    </Pane>

  );
}

export default App;
