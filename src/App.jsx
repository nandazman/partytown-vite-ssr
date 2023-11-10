import TagManager from "react-gtm-module";
import { Link, Route, Routes } from 'react-router-dom';

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob('./pages/*.jsx', { eager: true })

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1]
  return {
    name,
    path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
    component: pages[path].default,
  }
})

const handleTracker = (data) => {
  TagManager.dataLayer({ dataLayer: data });
};

export function App() {
  return (
    <>
      <nav>
        <ul>
          {routes.map(({ name, path }) => {
            return (
              <li key={path}>
                <Link to={path}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Routes>
        {routes.map(({ path, component: RouteComp }) => {
          return <Route key={path} path={path} element={<RouteComp />}></Route>;
        })}
      </Routes>
      <button
        onClick={() => {
          handleTracker({
            feature: "test-tracker 1",
            eventAction: "test-tracker",
          });
        }}
      >
        Test 1
      </button>
      <button
        onClick={() => {
          handleTracker({
            feature: "test-tracker 2",
            eventAction: "test-tracker",
          });
        }}
      >
        Test 2
      </button>
    </>
  );
}
