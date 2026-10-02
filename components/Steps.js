// "How it works" row: numbered steps, flat on the paper.
export default function Steps({ steps }) {
  return (
    <ol className="steps" role="list">
      {steps.map((s, i) => (
        <li className="step" key={s.h}>
          <span className="n" aria-hidden="true">
            {i + 1}
          </span>
          <h3>{s.h}</h3>
          <p>{s.p}</p>
        </li>
      ))}
    </ol>
  );
}
