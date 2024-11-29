import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Navbar } from "./components/Navbar";
import { Error } from "./pages/Error";
// import { Footer } from "./components/Footer";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/Layout/AdminLayout/AdminLayout";
import { Users } from "./pages/Admin/Users";
import { Category } from "./pages/Admin/Category";
import { AllTodos } from "./pages/Admin/AllTodos";
import { UpdateCategory } from "./pages/Admin/UpdateCategory";
import { Tag } from "./pages/Admin/Tag";
import { useAuth } from "./store/auth";
// import { useAuth } from "../../store/auth";

const App = () => {
  const { token } = useAuth();
  // console.log(token);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* console.log() */}
          <Route path="/" element={token ? <Home/> : <Login/>} />

          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<Users />} />
            <Route path="category" element={<Category />} />
            <Route path="category/:id/edit" element={<UpdateCategory />} />
            <Route path="tag" element={<Tag />} />
            <Route path="todos" element={<AllTodos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
