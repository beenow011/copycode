'use client';
import React, { createContext, Dispatch, SetStateAction, useState, ReactNode, FC } from "react";

interface dataParams {
  language: string;
  question: string;
  inputFormat: string;
  outputFormat: string;
  example: string;
  codeSnippet: string;
  code: string;
}

interface contextParams {
  data: dataParams;
  setData: Dispatch<SetStateAction<dataParams>>;
}

const initialData: dataParams = {
  language: '',
  question: '',
  inputFormat: '',
  outputFormat: '',
  example: '',
  codeSnippet: '',
  code: ''
};

export const PlaygroundContext = createContext<contextParams>({
  data: initialData,
  setData: () => { }
});

export const PlaygroundProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<dataParams>(initialData);

  return (
    <PlaygroundContext.Provider value={{ data, setData }}>
      {children}
    </PlaygroundContext.Provider>
  );
};
