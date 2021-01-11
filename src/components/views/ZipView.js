import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

export default function ZipView(props) {
  let { zip } = useParams();

  return (
    <div>
      <h1 style={{ padding: "50px" }}>Postinumero {zip}</h1>
    </div>
  );
}
