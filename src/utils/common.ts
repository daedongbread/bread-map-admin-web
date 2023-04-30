import axios from 'axios';
import { SelectOption } from '@/components/Shared';

const blobToFile = (theBlob: Blob, fileName: string): File => {
  return new File([theBlob as any], fileName, {
    lastModified: new Date().getTime(),
    type: theBlob.type,
  });
};

export const urlToFile = async (url: string, fileName: string): Promise<File> => {
  const file = await fetch(url)
    .then(r => r.blob())
    .then(blobFile => blobToFile(blobFile, fileName));

  return file;
};

export const formatTextToOptionObj = ({ constants, targetText }: { constants: SelectOption[]; targetText: string }) => {
  const option = constants.find(option => option.value === targetText);
  if (!option || !option.color) {
    return { color: '', text: '' };
  }

  return { color: option.color, text: option.name };
};

export const formatTextToOAlarmArr = ({ constants, targetObj }: { constants: (SelectOption & { bgColor: string })[]; targetObj: Record<string, number> }) => {
  const alarmArr: { color: string; bgColor: string; text: string }[] = [];

  Object.entries(targetObj).forEach(([key, value]) => {
    const option = constants.find(option => option.value === key);
    if (!option || !option.color) {
      return { color: '', bgColor: '', text: '' };
    }

    // value가 0이면 리턴하지말기
    if (value !== 0) {
      alarmArr.push({ color: option.color, bgColor: option.bgColor, text: `${option.name} ${value}` });
    }
  });

  return alarmArr;
};

const toDataURL = async (url: string) => {
  try {
    const response = await axios.get(url, { responseType: 'blob' });
    const imageDataUrl = URL.createObjectURL(response.data);
    return imageDataUrl;
  } catch (err) {
    window.alert('이미지 정보를 만드는데 실패했습니다. 계속 실패시 문의해주세요.');
  }
};

export const downloadImage = async (url: string, filename: string) => {
  const link = document.createElement('a');
  const result = await toDataURL(url);
  if (!result) {
    return window.alert('이미지 정보를 가져오는데 실패했습니다. 다시 시도해주세요.');
  }
  link.href = result;
  link.download = `${filename}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
