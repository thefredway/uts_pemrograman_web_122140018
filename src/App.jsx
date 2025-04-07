import { useState, lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useOutletContext
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import { ThreeKingdomsProvider } from './contexts/ThreeKingdomsContext'


const Home = lazy(() => import('./pages/Home'))
const Characters = lazy(() => import('./pages/Characters'))
const CharacterDetail = lazy(() => import('./pages/CharacterDetail'))
const Battles = lazy(() => import('./pages/Battles'))
const BattleDetail = lazy(() => import('./pages/BattleDetail'))
const BattleTimeline = lazy(() => import('./pages/BattleTimeline'))
const Favorites = lazy(() => import('./pages/Favorites'))
const SearchResults = lazy(() => import('./pages/SearchResults'))
const NotFound = lazy(() => import('./pages/NotFound'))


function RootLayout() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar onSearch={setSearchQuery} />
      <main className="flex-grow-1 container mt-4">
        <Suspense fallback={<LoadingSpinner />}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Outlet context={{ setIsLoading, searchQuery }} />
          )}
        </Suspense>
      </main>
      {!isLoading && <Footer />}
    </div>
  )
}

function usePageContext() {
  return useOutletContext()
}

const HomeWrapper = () => {
  const { setIsLoading } = usePageContext()
  return <Home setLoading={setIsLoading} />
}
const CharactersWrapper = () => {
  const { setIsLoading } = usePageContext()
  return <Characters setLoading={setIsLoading} />
}
const CharacterDetailWrapper = () => {
  const { setIsLoading } = usePageContext()
  return <CharacterDetail setLoading={setIsLoading} />
}
const BattlesWrapper = () => {
  const { setIsLoading } = usePageContext()
  return <Battles setLoading={setIsLoading} />
}
const BattleDetailWrapper = () => {
  const { setIsLoading } = usePageContext()
  return <BattleDetail setLoading={setIsLoading} />
}
const BattleTimelineWrapper = () => {
  const { setIsLoading } = usePageContext()
  return <BattleTimeline setLoading={setIsLoading} />
}
const FavoritesWrapper = () => {
  const { setIsLoading } = usePageContext()
  return <Favorites setLoading={setIsLoading} />
}
const SearchResultsWrapper = () => {
  const { setIsLoading, searchQuery } = usePageContext()
  return <SearchResults query={searchQuery} setLoading={setIsLoading} />
}
const NotFoundWrapper = () => {
  const { setIsLoading } = usePageContext()
  return <NotFound setLoading={setIsLoading} />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomeWrapper /> },
      { path: 'characters', element: <CharactersWrapper /> },
      { path: 'characters/:id', element: <CharacterDetailWrapper /> },
      { path: 'battles', element: <BattlesWrapper /> },
      { path: 'battles/:id', element: <BattleDetailWrapper /> },
      { path: 'battles/timeline', element: <BattleTimelineWrapper /> },
      { path: 'favorites', element: <FavoritesWrapper /> },
      { path: 'search', element: <SearchResultsWrapper /> },
      { path: '*', element: <NotFoundWrapper /> }
    ]
  }
])

function App() {
  return (
    <ThreeKingdomsProvider>
      <RouterProvider router={router} />
    </ThreeKingdomsProvider>
  )
}

export default App
