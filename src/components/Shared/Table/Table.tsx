import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableCell, TableProps } from '@/components/Shared/Table/types';
import { PATH } from '@/constants';
import styled from '@emotion/styled';

const getPath = (row: TableCell, path: string) => {
  let id: number;
  switch (path) {
    case PATH.Bakeries:
      id = row.bakeryId as number;
      break;
    case PATH.BakeryReports:
      id = row.reportId as number;
      break;
    default:
      id = 0;
      break;
  }

  return `${path}/${id}`;
};

export const Table = ({ headers, rows, event }: TableProps) => {
  const navigate = useNavigate();

  const movePage = (row: TableCell) => {
    const basePath = event?.move?.basePath;
    if (!basePath) return;
    const movePath = getPath(row, basePath);
    navigate(movePath);
  };

  return (
    <TableContainer>
      <CustomTable hover={!!event?.hover?.on}>
        <thead>
          <Tr>
            {headers.map(header => (
              <th key={`th-${header.key}`}>{header.name}</th>
            ))}
          </Tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <Tr data-testid="row" key={`row-${idx}`} onClick={() => movePage(row)}>
              {Object.keys(row).map((key, idx) => (
                <td key={`td-${key}-${idx}`}>{row[key]}</td>
              ))}
            </Tr>
          ))}
        </tbody>
      </CustomTable>
    </TableContainer>
  );
};

const TableContainer = styled.div`
  border: ${({ theme }) => `1px solid ${theme.color.gray100}`};
  width: ${({ theme }) => `calc(100vw - ${theme.size.sidebarWidth} - 12rem)`};
  white-space: nowrap;

  overflow-x: scroll;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const CustomTable = styled.table<{ hover: boolean }>`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: none;

  thead {
    tr > th {
      background-color: ${({ theme }) => theme.color.gray200};
      border-bottom-width: 0;
    }
  }

  tbody {
    tr {
      cursor: ${({ hover }) => hover && 'pointer'};
      &:hover td {
        background-color: ${({ hover, theme }) => hover && theme.color.gray100};
      }

      &:nth-of-type(even) {
        &:hover td {
          background-color: ${({ hover, theme }) => hover && theme.color.gray100};
        }
        td {
          background-color: ${({ theme }) => theme.color.gray50};
          border-top: ${({ theme }) => `1px solid ${theme.color.gray200}`};
        }
      }
    }
  }
`;

const Tr = styled.tr`
  th,
  td {
    text-align: center;
    font-size: 1.35rem;
    padding: 1.5rem 1.5rem;
  }

  td {
    background-color: ${({ theme }) => theme.color.white};
  }

  &:not(:last-of-type) {
    > td {
      border-bottom-width: 0;
    }
  }
`;
