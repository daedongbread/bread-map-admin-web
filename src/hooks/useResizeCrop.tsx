import { useEffect, useState } from 'react';
import { resizeAndCrop } from '@/utils/imageUtils';

type Props = {
  imageSrc: string;
};

const useResizeCrop = ({ imageSrc }: Props) => {
  const [resizedImgSrc, setResizedImgSrc] = useState('');

  useEffect(() => {
    resizeAndCrop(imageSrc, 192, 122)
      .then(resizedImg => setResizedImgSrc(resizedImg))
      .catch(error => console.error(`Error while ${imageSrc} resizing and cropping the image:`, error));
  }, []);

  return { resizedImgSrc };
};

export default useResizeCrop;
