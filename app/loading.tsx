import { Grid } from "react-loading-icons";
import ClipLoader from "react-spinners/ClipLoader";
export default function Loading() {
  return (
    <div>
      <Grid />
      <ClipLoader
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <h1 className="font-bold text-3xl">Loading</h1>
    </div>
  );
}
