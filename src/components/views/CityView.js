import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

export default function CitytView() {
  let { city } = useParams();
  return <h1 style={{ padding: "50px" }}>{city}</h1>;
}
