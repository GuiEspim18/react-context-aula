import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "pages/Login";
import Feira from "pages/Feira";
import Carrinho from "pages/Carrinho";
import { UserProider } from "common/contexts/User/User";

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <UserProider>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route path="/feira">
                        <Feira />
                    </Route>
                </UserProider>
                <Route path="/carrinho">
                    <Carrinho />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;