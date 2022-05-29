import { Button, TextInput } from 'grommet';
import React, { useCallback, useState } from 'react';
import { VintageButton } from '../../common';
import useMixer from '../mixer/useMixer';
import { download } from './Downloader';

const MixControl: React.FC<{}> = () => {
    const [downloadedFiles, setDownloadedFiles] = useState<Blob[]>([]);
    const [key, setKey] = useState<string | null>("1653508878241-2.wav");

    const getFileFromStorage = useCallback( async (key:string | null)=>{
        if(key){
            const newFile:Blob = await download(key) as Blob;
            const update = [...downloadedFiles, newFile];
            setDownloadedFiles(update); 
        }
    },[key, downloadedFiles])
    return (<div>
        <VintageButton onClick={()=>{getFileFromStorage(key).then();}}></VintageButton>
        {useMixer(downloadedFiles)}
    </div>)
};

export default MixControl;