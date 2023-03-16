import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "pages/Login";
import Feira from "pages/Feira";
import Carrinho from "pages/Carrinho";
import { UserProider } from "common/contexts/User/User";
import { ShoppingProvider } from "common/contexts/Shopping/Shopping";
import { PaymentProvider } from "common/contexts/Payment/Payment";

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <UserProider>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <ShoppingProvider>
                        <Route path="/feira">
                            <Feira />
                        </Route>
                        <PaymentProvider>
                            <Route path="/carrinho">
                                <Carrinho />
                            </Route>
                        </PaymentProvider>
                    </ShoppingProvider>
                </UserProider>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;