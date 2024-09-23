import { redirect } from "next/navigation";
import {getFromLocalStorage} from "../utils/local-storage";
const HomePage = () => {
  let access = getFromLocalStorage;
  if (access == undefined || access == null) {
    return redirect("/login");
  }
  else {
    return redirect("/manager/overview");
  }

};

export default HomePage;
