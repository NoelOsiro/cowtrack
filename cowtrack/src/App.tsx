import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Page from './pages/Home/Page';
import CategoryPage from './pages/Category/Page';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import React, { useEffect } from 'react';
import BreedPage from './components/BreedPage';
import AnimalsPage from './components/AnimalPage';
import { useStore } from './store/categoryStore';
import { Category } from './constants';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';


setupIonicReact();

const App: React.FC = () => {
  const setCategories = useStore((state) => state.addCategory);
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await Filesystem.readFile({
          path: 'categories.json',
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        });

        if (result.data) {
          const categories: Category[] = JSON.parse(result.data as string);
          categories.forEach((category) => setCategories(category));
        }
      } catch (error) {
        console.error('Unable to read file', error);
      }
    };

    loadCategories();
  }, [setCategories]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/folder/Home" />
            </Route>
            <Route path="/folder/Category" exact={true}>
              <CategoryPage />
            </Route>
            <Route path="/folder/Breeds" exact={true}>
              <BreedPage />
            </Route>
            <Route path="/folder/Animals" exact={true}>
              <AnimalsPage />
            </Route>
            <Route path="/folder/Home" exact={true}>
              <Page />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
