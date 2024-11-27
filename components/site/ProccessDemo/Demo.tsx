import "./styles.css";
import Lines from "./Lines";
import ReturnLines from "./ReturnLine";

export default function Demo() {
  return (
    <div className="demo-container rotated-container">

      <img className={`rotated-image`} src={`https://placehold.co/50x50`} />
      <img className={`rotated-image`}  src={`https://placehold.co/50x50`} />
      <img className={`rotated-image`}  src={`https://placehold.co/50x50`} />
      <img className={`rotated-image`}  src={`https://placehold.co/50x50`} />
      <img className={`rotated-image`}  src={`https://placehold.co/50x50`} />
      <img className={`rotated-image`}  src={`https://placehold.co/50x50`} />

      <div style={{ gridColumn: "1 / -1" }}>
        <Lines lineCount={6} />
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
      <img className={`rotated-image`} src={`https://placehold.co/50x50`} />
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <Lines lineCount={1}/>
      </div>
      
      <div style={{ gridColumn: "1 / -1" }}>
      <img className={`rotated-image`} src={`https://placehold.co/50x50`} />
      </div>

      <div style={{ gridColumn: "1 / -1" }}>
        <ReturnLines lineCount={1}/>
      </div>

    </div>
  );
}