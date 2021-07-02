import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext'

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/User/NewRoom";
import { Room } from "./pages/Room";
import { RoomsList } from "./pages/User/RoomList";
import { AdminRoom } from "./pages/User/AdminRoom";
import { NotFound } from "./pages/Error/NotFound";
import { NotPermition } from "./pages/Error/NotPermition";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/:id" component={Room} />

          <Route path="/user/rooms/new" component={NewRoom} />
          <Route path="/user/rooms/all" exact component={RoomsList} />
          <Route path="/user/rooms/:id" component={AdminRoom} />

          <Route path="/not-permition" component={NotPermition} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
