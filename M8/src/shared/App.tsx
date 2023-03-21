import "the-new-css-reset/css/reset.css";
import "./main.global.css";
import { Layout } from "./Layout";
import { Content } from "./Content";
import { Header } from "./Header";
import { CardsList } from "./CardsList";
import { TokenContextProvider } from "../context/tokenContext";
import { UserDataContextProvider } from "../context/userContext";
import { PostsDataContextProvider } from "../context/postsDataContext";

const App = () => {
  return (
    <TokenContextProvider>
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
    </TokenContextProvider>
  );
};

export default App;
