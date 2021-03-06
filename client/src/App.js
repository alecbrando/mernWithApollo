import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Container } from "semantic-ui-react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/auth";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
