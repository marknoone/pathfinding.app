import { ProjectData } from '../../store/project/constants';
import XMLExporter from './xmlExporter';
import JSONExporter from './jsonExporter';

export const DefaultXMLExporter = new XMLExporter();
export const DefaultJSONExporter = new JSONExporter();

export { default as XMLExporter} from './xmlExporter';
export { default as JSONExporter} from './jsonExporter';

export interface Exporter {
    Export: (name: string, p: ProjectData) => void
}