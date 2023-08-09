import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ReactBeautifulDnd from 'react-beautiful-dnd/index';
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
    case PATH.HomeScreen.AdminCommunity:
      id = row.managerId as number;
      break;
    case PATH.HomeScreen.Feeds:
      id = row.feedId as number;
      break;
    default:
      id = 0;
      break;
  }

  return id ? `${path}/${id}` : `${path}`;
};

export const Table = ({ headers, rows, event }: TableProps) => {
  const navigate = useNavigate();

  const handleClickHeader = (header: { key: string; name: string }) => {
    if (event?.headerClick) {
      if (header) {
        event.headerClick.fn(header);
      }
    }
  };

  const handleClickRow = (row: TableCell) => {
    // 상세페이지로 이동
    if (event?.move && event.move.basePath) {
      const basePath = event.move.basePath;
      const movePath = getPath(row, basePath);
      navigate(movePath);
    } else if (event?.click) {
      // 빵집제보 - 닉네임이 존재하는 경우, 닉네임을 이용
      if (row) {
        event.click.fn(row);
      }
    }
  };

  const onDragEnd = (dropResult: ReactBeautifulDnd.DropResult) => {
    if (!dropResult.destination) {
      return;
    }
    event?.draggable?.dragEndFn(dropResult as { source: { index: number }; destination: { index: number } });
  };

  return (
    <TableContainer>
      {event?.draggable?.on ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="Table">
            {provided => (
              <CustomTable {...provided.droppableProps} ref={provided.innerRef} hover={!!event?.hover?.on}>
                <thead>
                  <Tr>
                    {headers.map(header => (
                      <Th
                        key={`th-${header.key}`}
                        onClick={() => handleClickHeader(header)}
                        highlight={!!event?.headerStyle?.headerNames.includes(header.name)}
                      >
                        {header.name}
                      </Th>
                    ))}
                  </Tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <Draggable key={idx} draggableId={idx.toString()} index={idx}>
                      {provided => (
                        <Tr
                          data-testid="row"
                          key={`row-${idx}`}
                          onClick={() => handleClickRow(row)}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {headers.map((header, hIdx) => {
                            return <td key={`header-${hIdx}`}>{row[header.key]}</td>;
                          })}
                        </Tr>
                      )}
                    </Draggable>
                  ))}
                </tbody>
              </CustomTable>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <CustomTable hover={!!event?.hover?.on}>
          <thead>
            <Tr>
              {headers.map(header => (
                <Th key={`th-${header.key}`} onClick={() => handleClickHeader(header)} highlight={!!event?.headerStyle?.headerNames.includes(header.name)}>
                  {header.name}
                </Th>
              ))}
            </Tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <Tr data-testid="row" key={`row-${idx}`} onClick={() => handleClickRow(row)}>
                {headers.map((header, hIdx) => (
                  <td key={`header-${hIdx}`}>{row[header.key]}</td>
                ))}
              </Tr>
            ))}
          </tbody>
        </CustomTable>
      )}
    </TableContainer>
  );
};

const TableContainer = styled.div`
  border: ${({ theme }) => `1px solid ${theme.color.gray100}`};
  // width: ${({ theme }) => `calc(100vw - ${theme.size.sidebarWidth} - 12rem)`};
  width: 100%;
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

  top: auto !important;
  left: auto !important;
`;

const Th = styled.th<{ highlight: boolean }>`
  color: ${({ highlight, theme }) => (highlight ? theme.color.primary500 : 'black')};
  text-decoration: ${({ highlight }) => (highlight ? 'underline' : 'none')};
`;
