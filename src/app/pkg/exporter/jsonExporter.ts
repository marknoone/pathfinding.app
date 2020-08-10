import { Exporter } from './index';
import { ProjectData } from '../../store/project/constants';

class JSONExporter implements Exporter {
    Export(name: string, p: ProjectData){
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(p, null, 2));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        if(dlAnchorElem){
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", `${name}.json`);
            dlAnchorElem.click();
        }
        
    }
};

export default JSONExporter;