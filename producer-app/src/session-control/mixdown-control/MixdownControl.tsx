import { Button, TextInput } from 'grommet';
import React, { useCallback, useState } from 'react';
import { VintageButton } from '../../common';
import useMixer from '../mixer/useMixer';
import { download } from './Downloader';

const MixControl: React.FC<{recordingsByTime:Record<string, Array<Record<string,any>>>}> = ({recordingsByTime}) => {
    const [downloadedFiles, setDownloadedFiles] = useState<Blob[]>([]);
    const [key, setKey] = useState<string | null>("1653508878241-2.wav");

    const getFilesFromStorage = useCallback( async ()=>{
        if(key){
            const fileNames = recordingsByTime[key].map((v)=>v.fileUrl);
            setKey("");
            for (const fileName of fileNames){
                const newFile:Blob = await download(fileName) as Blob;
                const update = [...downloadedFiles, newFile];
                setDownloadedFiles(update);
            }
        }
    },[key, downloadedFiles, recordingsByTime])
    return (<div>
        {Object.keys(recordingsByTime).map((date)=>{
            const count = recordingsByTime[date].length
            return <VintageButton onClick={()=>{getFilesFromStorage().then();}}>{new Date(date).toTimeString().split(" ")[0]}: {count} player{count>1?"s":""}</VintageButton>
        })}
        
        {useMixer(downloadedFiles)}
    </div>)
};

export default MixControl;