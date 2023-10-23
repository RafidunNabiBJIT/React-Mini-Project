import Navbar from "./components/homeNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./css/font.css";
import Footer from "./components/footer";
import "./css/wholeContainer.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import RegistrationPage from "./pages/registerPage";
import NotFoundPage from "./pages/notFoundPage";
import AddProductPage from "./pages/addProductPage";
import LoginPage from "./pages/loginPage";
import Authenticate from "./components/authenticate";
import ProductDetails from "./pages/productDetailPage";
import SearchPage from "./pages/searchPage";
import AdminPanel from "./pages/adminPanelPage";
import AdminPanelAllUser from "./pages/adminPanelAllUser";
import BookForm from "./components/modifyBooks/createBooksAdmin";
import UpdateBookForm from "./components/modifyBooks/updateBooksAdmin";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-bootstrap";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container" style={{ width: "1200px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Authenticate />}>
            <Route path="/adminPanelAllUser" element={<AdminPanelAllUser />} />
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/addproduct" element={<AddProductPage />} />
            <Route path="/:productId" element={<ProductDetails />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/createBook" element={<BookForm />} />
            <Route path="/updateBook/:bookId" element={<UpdateBookForm />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          pauseOnHover={false}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
