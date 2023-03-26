import { useEffect, useState } from 'react';

export const useCopyClipboard = (copyText: string) => {
  const [text, setText] = useState(copyText);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let copyHandler: NodeJS.Timeout;

    if (isCopied) {
      copyHandler = setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }

    return () => {
      clearTimeout(copyHandler);
    };
  }, [isCopied]);

  const setCopyText = (text: string) => {
    setText(text);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(copyText).then(() => {
      setIsCopied(true);
    });
  };

  return { isCopied, setCopyText, copyToClipboard };
};
