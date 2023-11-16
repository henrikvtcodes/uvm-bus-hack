import { Stop } from "../transloc/stops";

export const StopDisplay = (props: { stop: Stop; isLink?: boolean }) => {
  return (
    <div>
      {props.isLink ? (
        <a
          class="underline text-blue-900 hover:text-blue-700"
          href={`/app/stops/${props.stop.id}`}
        >
          <h3>{props.stop.name}</h3>
        </a>
      ) : (
        <h3>{props.stop.name}</h3>
      )}
    </div>
  );
};
