import { Exporter } from './index';
import { ProjectData } from '../../store/project/constants';

class XMLExporter implements Exporter {
    Export(name: string, p: ProjectData){}
};

export default XMLExporter;