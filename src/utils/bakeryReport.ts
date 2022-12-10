import { BakeryReportsItemEntity } from '@/apis';
import { ContentsRow } from '@/components/BakeryReportDetail';

const extractContentsWithType = (bakeryReport: BakeryReportsItemEntity): ContentsRow[] => {
  const contents: ContentsRow[] = [
    { label: '제보자', text: bakeryReport.nickName, type: 'input' },
    { label: '빵집 이름', text: bakeryReport.bakeryName, type: 'input' },
    { label: '빵집 위치', text: bakeryReport.location, type: 'input' },
    { label: '추천 이유', text: bakeryReport.content, type: 'textarea' },
  ];
  return contents;
};

export { extractContentsWithType };
