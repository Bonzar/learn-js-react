import "the-new-css-reset/css/reset.css";
import "./main.global.css";
import { Layout } from "./Layout";
import { Content } from "./Content";
import { Header } from "./Header";
import { CardsList } from "./CardsList";
import { UserDataContextProvider } from "../context/userContext";
import { PostsDataContextProvider } from "../context/postsDataContext";
import { Provider } from "react-redux";
import store from "../store/store";
import { TokenExtractor } from "./TokenExtractor";

const App = () => {
  return (
    <Provider store={store}>
      <TokenExtractor />
      <UserDataContextProvider>
        <Layout>
          <Header />
          <Content>
            <PostsDataContextProvider>
              <CardsList />
            </PostsDataContextProvider>
          </Content>
        </Layout>
      </UserDataContextProvider>
    </Provider>
  );
};

export default App;
