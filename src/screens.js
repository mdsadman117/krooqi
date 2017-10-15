/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Home from './modules/home';
import Favorites from './modules/favorites';
import Search from './modules/search';
import SavedSearch from './modules/savedSearch';
import MoreMenu from './modules/moreMenu';
import PropertyList from './components/PropertyList';
import HomeTopBar from './components/HomeTopBar';
import PropertyDetail from './components/PropertyDetail';
import SearchTopBar from './components/SearchTopBar';
import SearchFormPage from './components/SearchFormpage';
import SearchPage from './components/searchPage';
import FilterPage from './components/filterPage';
import MapDetail from './components/MapDetail';
import SortModal from './components/sortModal';
import SaveSearchModal from './components/saveSearchModal';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('krooqi.Home', () => Home, store, Provider);
  Navigation.registerComponent('krooqi.HomeTopBar', () => HomeTopBar);
  Navigation.registerComponent('krooqi.PropertyList', () => PropertyList, store, Provider);
  Navigation.registerComponent('krooqi.PropertyDetail', () => PropertyDetail, store, Provider);
  Navigation.registerComponent('krooqi.Search', () => Search, store, Provider);
  Navigation.registerComponent('krooqi.SearchPage', () => SearchPage, store, Provider);
  Navigation.registerComponent('krooqi.Search.SortModal', () => SortModal, store, Provider);
  Navigation.registerComponent(
    'krooqi.Search.SaveSearchModal',
    () => SaveSearchModal,
    store,
    Provider,
  );
  Navigation.registerComponent('krooqi.MapDetail', () => MapDetail, store, Provider);
  Navigation.registerComponent('krooqi.FilterPage', () => FilterPage, store, Provider);
  Navigation.registerComponent('krooqi.SearchTopBar', () => SearchTopBar, store, Provider);
  Navigation.registerComponent('krooqi.SearchFormPage', () => SearchFormPage, store, Provider);
  Navigation.registerComponent('krooqi.Favorites', () => Favorites, store, Provider);
  Navigation.registerComponent('krooqi.SavedSearch', () => SavedSearch, store, Provider);
  Navigation.registerComponent('krooqi.MoreMenu', () => MoreMenu, store, Provider);
}
