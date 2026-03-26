import React from 'react';

interface ChapterNameProps {
  name: string;
  className?: string;
}

const ChapterName: React.FC<ChapterNameProps> = ({ name, className = '' }) => {
  // Split "SDxUCSD" into "SDx" + "UCSD"
  const prefix = 'SDx';
  const suffix = name.startsWith(prefix) ? name.slice(prefix.length) : '';

  if (!suffix) {
    return <span className={className}>{name}</span>;
  }

  return (
    <span className={className}>
      {prefix}<span className="text-outline-thin">{suffix}</span>
    </span>
  );
};

export default ChapterName;
