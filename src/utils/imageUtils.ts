const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = error => reject(error);
    img.src = src;
    img.crossOrigin = 'Anonymous';
  });
};

const resizeAndCrop = async (imgSrc: string, targetWidth: number, targetHeight: number): Promise<string> => {
  const img = await loadImage(imgSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const sourceAspectRatio = img.width / img.height;
  const targetAspectRatio = targetWidth / targetHeight;

  let sourceWidth, sourceHeight, sourceX, sourceY;

  if (sourceAspectRatio > targetAspectRatio) {
    // 이미지가 화면보다 가로로 길 경우
    sourceHeight = img.height;
    sourceWidth = sourceHeight * targetAspectRatio;
    sourceX = (img.width - sourceWidth) / 2;
    sourceY = 0;
  } else {
    // 이미지가 화면보다 세로로 길 경우
    sourceWidth = img.width;
    sourceHeight = sourceWidth / targetAspectRatio;
    sourceX = 0;
    sourceY = (img.height - sourceHeight) / 2;
  }

  ctx && ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, targetWidth, targetHeight);

  return canvas.toDataURL();
};

export { resizeAndCrop };
