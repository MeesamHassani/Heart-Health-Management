import * as T from "../type";

const initialState = {
  authUser: "",
  user: null,
  signedin: false,
  loading: false
};
export default (state = initialState, action) => {
  console.log("action", action);
  switch (action.type) {
    case T.USER_LOGIN_AUTHENTICATION:
      return {
        ...state,
        authUser: action.payload,
      };
    case T.LOGIN_SUCCESS:
      return { ...state, user: action.payload, signedin: action.signedin };
    case T.USER_NOT_LOGGEDIN:
      return { ...state, user: action.payload, signedin: action.signedin };
    case T.SET_LOADING:
      return {...state, loading: action.loading}
    default:
      return state;
  }
};

// const Routes = (sessionInfo, checked) =>
//   sessionInfo.checked && (
//     <div>
//       <Switch>
//         <Route exact path="/" render={() => <Redirect to="/projects" />} />
//         <DeverseRoute
//           exact
//           path="/login"
//           component={Login}
//           authenticated={sessionInfo}
//         />
//         <LayoutRoute
//           exact
//           path="/projects"
//           component={Projects}
//           layout={MainLayout}
//           authenticated={sessionInfo}
//         />
//         <Route component={NotFound} />
//       </Switch>
//     </div>
//   );
// //Diverse Route is used for login Route
// const DeverseRoute = ({
//   component: ContentComponent,
//   authenticated,
//   ...rest
// }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       authenticated.sessionInfo ? (
//         <Redirect
//           to={{ pathname: "/projects", state: { from: props.location } }}
//         />
//       ) : (
//         <ContentComponent {...props} />
//       )
//     }
//   />
// );
// DeverseRoute.propTypes = { component: PropTypes.func, layout: PropTypes.func };
// DeverseRoute.defaultProps = { component: EmptyComponent, layout: NoLayout };
// //LayoutRoute is used to switch main components
// const LayoutRoute = ({
//   component: ContentComponent,
//   layout: Layout,
//   authenticated,
//   ...rest
// }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       authenticated.sessionInfo ? (
//         <Layout>
//           <ContentComponent {...props} />
//         </Layout>
//       ) : (
//         <Redirect
//           to={{ pathname: "/login", state: { from: props.location } }}
//         />
//       )
//     }
//   />
// );
// LayoutRoute.propTypes = { component: PropTypes.func, layout: PropTypes.func };
// LayoutRoute.defaultProps = { component: EmptyComponent, layout: NoLayout };
