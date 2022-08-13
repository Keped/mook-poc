import { Button, TextInput } from 'grommet';
import React, { useCallback, useState } from 'react';
import { VintageButton } from '../../common';
import useMixer from '../mixer/useMixer';
import { download } from './Downloader';

const MixControl: React.FC<{sessionId:string, recordingsByTime:Record<string, Array<Record<string,any>>>}> = ({recordingsByTime, sessionId}) => {
    const [downloadedFiles, setDownloadedFiles] = useState<Blob[]>([]);
    const [key, setKey] = useState<string | null>(null);

    const getFilesFromStorage = useCallback( async ()=>{
        if(key){
            console.log(recordingsByTime)
            const fileNames = recordingsByTime[key].map((v)=>v.fileUrl);
            setKey(null);
            for (const fileName of fileNames){
                const newFile:Blob = await download(fileName.replace(`-${sessionId}.wav`, ".wav")) as Blob;
                const update = [...downloadedFiles, newFile];
                setDownloadedFiles(update);
            }
        }
    },[key, recordingsByTime, sessionId, downloadedFiles])
    return (<div>
        {Object.keys(recordingsByTime).map((date)=>{
            const count = recordingsByTime[date].length
            return <VintageButton onClick={()=>{
                setKey(date)
                getFilesFromStorage().then();}}>{new Date(date).toTimeString().split(" ")[0]}: {count} player{count>1?"s":""}</VintageButton>
        })}
         {/* <VintageButton onClick={()=>{getFilesFromStorage().then();}}>Download!</VintageButton> */}
        {useMixer(downloadedFiles)}
    </div>)
};

export default MixControl;