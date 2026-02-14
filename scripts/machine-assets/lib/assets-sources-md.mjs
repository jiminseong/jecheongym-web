const MACHINE_TABLE_HEADER_REGEX =
  /^\|\s*ID\s*\|\s*Brand\s*\|\s*Model\s*\|\s*File Name\s*\|\s*Source URL\s*\|\s*Acquired At\s*\|\s*Status\s*\|$/i;

function splitRowCells(line) {
  return line
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());
}

function stripBackticks(value) {
  return value.replace(/^`/, "").replace(/`$/, "");
}

function isDividerRow(cells) {
  if (cells.length === 0) {
    return false;
  }

  return cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

export function parseAssetsSourcesMachineRows(markdown) {
  const lines = markdown.split(/\r?\n/);
  const rows = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!MACHINE_TABLE_HEADER_REGEX.test(line)) {
      continue;
    }

    for (let rowIndex = i + 1; rowIndex < lines.length; rowIndex += 1) {
      const rowLine = lines[rowIndex];
      if (!rowLine.trim().startsWith("|")) {
        break;
      }

      const cells = splitRowCells(rowLine);
      if (cells.length < 7 || isDividerRow(cells)) {
        continue;
      }

      const id = Number.parseInt(cells[0], 10);
      if (!Number.isInteger(id)) {
        continue;
      }

      rows.push({
        id,
        brand: cells[1],
        model: cells[2],
        fileName: stripBackticks(cells[3]),
        sourceUrl: cells[4],
        acquiredAt: cells[5],
        status: cells[6],
        lineIndex: rowIndex,
      });
    }
  }

  return { lines, rows };
}

export function fileNameToSlug(fileName) {
  return fileName.replace(/^\d+-/, "").replace(/\.webp$/i, "");
}

function formatMachineRow(row) {
  return `| ${row.id} | ${row.brand} | ${row.model} | \`${row.fileName}\` | ${row.sourceUrl} | ${row.acquiredAt} | ${row.status} |`;
}

export function applyMachineRowUpdates(markdown, updatesById) {
  const { lines, rows } = parseAssetsSourcesMachineRows(markdown);

  for (const row of rows) {
    const update = updatesById.get(row.id);
    if (!update) {
      continue;
    }

    const nextRow = {
      ...row,
      sourceUrl: update.sourceUrl ?? row.sourceUrl,
      acquiredAt: update.acquiredAt ?? row.acquiredAt,
      status: update.status ?? row.status,
    };

    lines[row.lineIndex] = formatMachineRow(nextRow);
  }

  return lines.join("\n");
}
