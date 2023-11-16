import { Stop } from "../transloc/stops";

export const StopDisplay = (props: { stop: Stop }) => {
  return (
    <div>
      <h3>{props.stop.name}</h3>
      <p>{props.stop.description}</p>
    </div>
  );
};
