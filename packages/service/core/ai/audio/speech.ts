import type { NextApiResponse } from 'next';
import { getAIApi, openaiBaseUrl } from '../config';
import { getTTSModel } from '../model';
import { OpenaiAccountType } from '@fastgpt/global/support/user/team/type';

export async function text2Speech({
  res,
  onSuccess,
  onError,
  input,
  model,
  voice,
  speed = 1
}: {
  res: NextApiResponse;
  onSuccess: (e: { model: string; buffer: Buffer }) => void;
  onError: (e: any) => void;
  input: string;
  model: string;
  voice: string;
  speed?: number;
}) {
  const modelData = getTTSModel(model)!;
  const myOpenAIAccount: OpenaiAccountType = {
    key: modelData.requestAuth || '', // 替换为你的实际的key
    baseUrl: modelData.requestUrl || '' // 替换为你的baseUrl
  };
  const ai = getAIApi({
    userKey: myOpenAIAccount
  });

  const response = await ai.audio.speech.create(
    {
      model,
      // @ts-ignore
      voice,
      input,
      response_format: 'mp3',
      speed
    }
    // modelData.requestUrl && modelData.requestAuth
    //   ? {
    //       path: modelData.requestUrl,
    //       headers: {
    //         Authorization: `Bearer ${modelData.requestAuth}`
    //       }
    //     }
    //   : {}
  );

  const readableStream = response.body as unknown as NodeJS.ReadableStream;
  readableStream.pipe(res);

  let bufferStore = Buffer.from([]);

  readableStream.on('data', (chunk) => {
    bufferStore = Buffer.concat([bufferStore, chunk]);
  });
  readableStream.on('end', () => {
    onSuccess({ model, buffer: bufferStore });
  });
  readableStream.on('error', (e) => {
    onError(e);
  });
}
