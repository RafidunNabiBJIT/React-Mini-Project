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
import PublicHome from "./components/publicHome";
import Home from "./components/home";
import AdminProductDetail from "./pages/adminProductDetail";
import CurrentlyBorrowedBooks from "./components/currentlyBorrowedBooks";
import CurrentlyBorrowedBooksAdmin from "./pages/currentlyBorrowedBooksAdmin";
import AdminDataFetcher from "./pages/currentlyBorrowedBooksAdmin";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container" style={{ width: "1200px" }}>
        <Routes>
          <Route path="/" element={<PublicHome />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Authenticate />}>
            <Route path="/home" element={<Home />} />
            <Route path="/adminPanelAllUser" element={<AdminPanelAllUser />} />
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/addproduct" element={<AddProductPage />} />
            <Route path="/:productId" element={<ProductDetails />} />
            <Route
              path="/currentlyBorrowedBooksAdmin"
              element={<AdminDataFetcher />}
            />
            <Route
              path="/adminPanel/admin/:productId"
              element={<AdminProductDetail />}
            />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/createBook" element={<BookForm />} />
            <Route path="/updateBook/:bookId" element={<UpdateBookForm />} />
          </Route>
        </Routes>
      </div>

      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
