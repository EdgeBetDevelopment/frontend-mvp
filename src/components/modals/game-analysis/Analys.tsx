import React from 'react';

import { cn } from '@/lib/utils';

function parseAnalysis(text?: string) {
  if (!text) return [];
  const sections: { title: string; items: string[] }[] = [];

  const sectionRe =
    /(?:^|\n)\s*•\s*([^\n:]+):\s*([\s\S]*?)(?=(?:\n\s*•\s*[^\n:]+:)|\s*$)/g;
  let m: RegExpExecArray | null;

  while ((m = sectionRe.exec(text))) {
    const title = m[1].trim();
    const block = m[2];

    const itemRe = /^\s*•\s+(.*)$/gm;
    const items: string[] = [];
    let im: RegExpExecArray | null;

    while ((im = itemRe.exec(block))) {
      const item = im[1].trim();
      if (item) items.push(item);
    }

    if (!items.length) {
      const fallback = block.trim();
      if (fallback) items.push(fallback);
    }

    sections.push({ title, items });
  }

  if (!sections.length) {
    const lines = text
      .split('\n')
      .map((s) => s.replace(/^\s*•\s*/, '').trim())
      .filter(Boolean);
    sections.push({
      title: 'Analysis',
      items: lines.length ? lines : [text.trim()],
    });
  }

  return sections;
}

export const Analysis = ({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) => {
  const sections = parseAnalysis(text);

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {sections.map(({ title, items }) => (
        <section
          key={title}
          className="border-border/50 bg-background/40 rounded-xl border p-4 shadow-sm"
        >
          <h3 className="mb-2 text-sm font-semibold tracking-tight">{title}</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
            {items.map((it, idx) => (
              <li key={idx}>{it}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};
