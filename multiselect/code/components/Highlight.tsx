const Highlight = ({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) => {
  if (!highlight) return text;

  const regexp = new RegExp(highlight, "gi");
  const matches = Array.from(text.matchAll(regexp));

  if (!matches.length) return text;

  const parts = [];
  let lastIndex = 0;

  matches.forEach((match) => {
    parts.push(text.substring(lastIndex, match.index));
    parts.push(
      <span key={match.index} className="text-blue-500 font-medium">
        {match[0]}
      </span>
    );
    lastIndex = match.index + match[0].length;
  });

  parts.push(text.substring(lastIndex));

  return <div className="text-slate-700">{parts}</div>;
};

export default Highlight;
