import fs from 'fs';
import { getAxiosConfig } from '../config';
import axios from 'axios';
import FormData from 'form-data';
import { getSTTModel } from '../model';

export const aiTranscriptions = async ({
  model,
  fileStream,
  filePath
}: {
  model: string;
  fileStream: fs.ReadStream;
  filePath: string;
}) => {
  const data = new FormData();
  data.append('model', model);
  data.append('file', fileStream);

  const modelData = getSTTModel(model);
  const aiAxiosConfig = getAxiosConfig();

  console.log('-------------------------------------------');
  console.log(
    modelData.requestUrl
      ? { url: modelData.requestUrl }
      : {
          baseURL: aiAxiosConfig.baseUrl,
          url: '/audio/transcriptions'
        }
  );
  console.log('-------------------------------------------');
  console.log(filePath);
  console.log('-------------------------------------------');

  const { data: result } = await axios<{ text: string }>({
    method: 'post',
    ...(modelData.requestUrl
      ? { url: modelData.requestUrl }
      : {
          baseURL: aiAxiosConfig.baseUrl,
          url: '/audio/transcriptions'
        }),
    // headers: {
    //   Authorization: modelData.requestAuth
    //     ? `Bearer ${modelData.requestAuth}`
    //     : aiAxiosConfig.authorization,
    //   ...data.getHeaders()
    // },
    data: { data: filePath }
  });

  return result;
};
