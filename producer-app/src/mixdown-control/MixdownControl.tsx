import React, { useState } from 'react';
import useMixer from '../mixer/useMixer';

const MixControl: React.FC<{}> = () => {
    const [downloadedFiles, setDownloadedFiles] = useState([]);

    return (<div>
        {useMixer(downloadedFiles)}
    </div>)
};

export default MixControl;