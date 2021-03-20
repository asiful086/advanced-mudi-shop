// import logo from './logo.svg';
import "./App.css";
import { Route, Switch } from "react-router-dom";
import AdminLayoutRoute from "./layouts/admin/AdminLayoutRoute";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminForgotPasswordPage from "./pages/admin/AdminForgotPasswordPage";
import AdminResetPasswordPage from "./pages/admin/AdminResetPasswordPage";
import AdminCategoryListPage from "./pages/admin/category/AdminCategoryListPage";
import AdminCategoryCreatePage from "./pages/admin/category/AdminCategoryCreatePage";
import AdminCategoryEditPage from "./pages/admin/category/AdminCategoryEditPage";

function App() {
  return (
    <div>
      <Switch>
        {/* front */}
        {/* <FrontRoute exact path="/" component={Home} />
        <FrontRoute exact path="/product" component={FrontProduct} /> */}
        {/* <Proute exact path="/dashboard" component={AdminHome} /> */}
        {/* <Route path="/" component={AdminResetPasswordPage} /> */}
        <Route path="/admin/login" component={AdminLoginPage} />
        <Route
          path="/admin/forgotpassword"
          component={AdminForgotPasswordPage}
        />
        <Route
          path="/resetpassword/:resetToken"
          component={AdminResetPasswordPage}
        />
        {/* admin route */}
        <AdminLayoutRoute exact path="/dashboard" component={AdminHomePage} />
        {/* category route */}
        <AdminLayoutRoute
          path="/admin/category/list"
          component={AdminCategoryListPage}
        />
        <AdminLayoutRoute
          path="/admin/category/add"
          component={AdminCategoryCreatePage}
        />
        <AdminLayoutRoute
          path="/admin/category/edit/:id"
          component={AdminCategoryEditPage}
        />
      </Switch>
    </div>
  );
}

export default App;
