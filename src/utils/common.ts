import { SelectOption } from '@/components/Shared';

const blobToFile = (theBlob: Blob, fileName: string): File => {
  return new File([theBlob as any], fileName, {
    lastModified: new Date().getTime(),
    type: theBlob.type,
  });
};

const urlToFile = async (url: string, fileName: string): Promise<File> => {
  const file = await fetch(url)
    .then(r => r.blob())
    .then(blobFile => blobToFile(blobFile, fileName));

  return file;
};

const urlToBlob = async (url: string, fileName: string): Promise<Blob> => {
  return await fetch(url).then(r => r.blob());
};

const formatTextToOptionObj = ({ constants, targetText }: { constants: SelectOption[]; targetText: string }) => {
  const option = constants.find(option => option.value === targetText);
  if (!option || !option.color) {
    return { color: '', text: '' };
  }

  return { color: option.color, text: option.name };
};

export { urlToFile, urlToBlob, formatTextToOptionObj };
