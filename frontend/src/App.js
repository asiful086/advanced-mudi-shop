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
import AdminSubcategoryCreatePage from "./pages/admin/subcategory/AdminSubcategoryCreatePage";
import AdminSubcategoryListPage from "./pages/admin/subcategory/AdminSubcategoryListPage";
import AdminSubcategoryEditPage from "./pages/admin/subcategory/AdminSubcategoryEditPage";
import AdminSubsubcategoryListPage from "./pages/admin/subsubcategory/AdminSubsubcategoryListPage";
import AdminSubsubcategoryCreatePage from "./pages/admin/subsubcategory/AdminSubsubcategoryCreatePage";
import AdminSubsubcategoryEditPage from "./pages/admin/subsubcategory/AdminSubsubcategoryEditPage";
import AdminVariationCreatePage from "./pages/admin/variation/AdminVariationCreatePage";
import AdminVariationListPage from "./pages/admin/variation/AdminVariationListPage";
import AdminVariationEditPage from "./pages/admin/variation/AdminVariationEditPage";
import AdminVariationValueListPage from "./pages/admin/variationvalue/AdminVariationValueListPage";
import AdminVariationValueCreatePage from "./pages/admin/variationvalue/AdminVariationValueCreatePage";
import AdminVariationValueEditPage from "./pages/admin/variationvalue/AdminVariationValueEditPage";
import AdminProductListPage from "./pages/admin/product/AdminProductListPage";
import AdminProductCreatePage from "./pages/admin/product/AdminProductCreatePage";
import AdminProductEditPage from "./pages/admin/product/AdminProductEditPage";
import BuyerLayoutRoute from "./layouts/buyer/BuyerLayoutRoute";
import BuyerHomePage from "./pages/buyer/BuyerHomePage";
import BuyerLayoutProtectedRoute from "./layouts/buyer/BuyerLayoutProtectedRoute";
import BuyerShippingPage from "./pages/buyer/BuyerShippingPage";
import BuyerPaymentPage from "./pages/buyer/BuyerPaymentPage";
import BuyerPlaceOrderPage from "./pages/buyer/BuyerPlaceOrderPage";
import BuyerOrderPage from "./pages/buyer/BuyerOrderPage";

function App() {
  return (
    <div>
      <Switch>
        <BuyerLayoutRoute exact path="/" component={BuyerHomePage} />
        <BuyerLayoutProtectedRoute
          path="/shipping"
          component={BuyerShippingPage}
        />
        <BuyerLayoutProtectedRoute
          path="/payment"
          component={BuyerPaymentPage}
        />
        <BuyerLayoutProtectedRoute
          path="/placeorder"
          component={BuyerPlaceOrderPage}
        />
        <BuyerLayoutProtectedRoute
          path="/buyer/order/:id"
          component={BuyerOrderPage}
        />

        {/* front */}
        {/* <FrontRoute exact path="/" component={Home} />
        <FrontRoute exact path="/product" component={FrontProduct} /> */}
        {/* <Proute exact path="/dashboard" component={AdminHome} /> */}
        {/* <Route path="/" component={AdminResetPasswordPage} /> */}
        {/* <Route exact path="/" component={AdminLoginPage} /> */}
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
        {/* subcategory route */}
        <AdminLayoutRoute
          path="/admin/subcategory/list"
          component={AdminSubcategoryListPage}
        />
        <AdminLayoutRoute
          path="/admin/subcategory/add"
          component={AdminSubcategoryCreatePage}
        />
        <AdminLayoutRoute
          path="/admin/subcategory/edit/:id"
          component={AdminSubcategoryEditPage}
        />
        {/* subsubcategory route */}
        <AdminLayoutRoute
          path="/admin/subsubcategory/list"
          component={AdminSubsubcategoryListPage}
        />
        <AdminLayoutRoute
          path="/admin/subsubcategory/add"
          component={AdminSubsubcategoryCreatePage}
        />
        <AdminLayoutRoute
          path="/admin/subsubcategory/edit/:id"
          component={AdminSubsubcategoryEditPage}
        />
        {/* variation route */}
        {/* <AdminLayoutRoute
          path="/admin/variation/list"
          component={AdminVariationListPage}
        />
        <AdminLayoutRoute
          path="/admin/variation/add"
          component={AdminVariationCreatePage}
        />
        <AdminLayoutRoute
          path="/admin/variation/edit/:id"
          component={AdminVariationEditPage}
        /> */}
        {/* variationvalue route */}
        {/* <AdminLayoutRoute
          path="/admin/variationvalue/list"
          component={AdminVariationValueListPage}
        />
        <AdminLayoutRoute
          path="/admin/variationvalue/add"
          component={AdminVariationValueCreatePage}
        />
        <AdminLayoutRoute
          path="/admin/variationvalue/edit/:id"
          component={AdminVariationValueEditPage}
        /> */}
        {/* product route */}
        <AdminLayoutRoute
          path="/admin/product/list"
          component={AdminProductListPage}
        />
        <AdminLayoutRoute
          path="/admin/product/add"
          component={AdminProductCreatePage}
        />
        <AdminLayoutRoute
          path="/admin/product/edit/:id"
          component={AdminProductEditPage}
        />
      </Switch>
    </div>
  );
}

export default App;
